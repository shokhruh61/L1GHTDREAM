import axios from "axios";

const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 15000,
});

const getApiKey = () => {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!key) throw new Error("Missing YouTube API key (VITE_YOUTUBE_API_KEY)");
  return key;
};

export const getErrorMessage = (err, fallback = "Request failed") =>
  err?.response?.data?.error?.message || err?.message || fallback;

/**
 * Heuristic helpers
 */
const textLooksLikeShort = (text = "") =>
  /(^|\s)#shorts(\s|$)/i.test(text) || /\bshorts\b/i.test(text);

const parseISODurationToSeconds = (iso = "") => {
  // Example: PT1M2S, PT59S, PT2H3M4S
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return null;
  const h = Number(m[1] || 0);
  const min = Number(m[2] || 0);
  const s = Number(m[3] || 0);
  return h * 3600 + min * 60 + s;
};

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

/**
 * Basic channel search (snippet only)
 */
export const fetchChannelVideos = async ({ channelId, maxResults = 12, pageToken }) => {
  const key = getApiKey();
  const { data } = await youtubeApi.get("/search", {
    params: {
      key,
      channelId,
      part: "snippet",
      order: "date",
      maxResults,
      type: "video",
      pageToken,
    },
  });

  return {
    items: data?.items || [],
    nextPageToken: data?.nextPageToken || null,
  };
};

/**
 * Fetch video details in batch (contentDetails + statistics + snippet)
 * YouTube API max 50 ids per request.
 */
export const fetchVideoDetailsBatch = async (videoIds = [], part = "snippet,contentDetails,statistics") => {
  const ids = (videoIds || []).filter(Boolean);
  if (ids.length === 0) return [];
  const key = getApiKey();

  const batches = chunk(ids, 50);
  const results = await Promise.all(
    batches.map(async (batchIds) => {
      const { data } = await youtubeApi.get("/videos", {
        params: {
          key,
          id: batchIds.join(","),
          part,
        },
      });
      return data?.items || [];
    })
  );

  return results.flat();
};

export const fetchVideoDetails = async (videoId) => {
  const items = await fetchVideoDetailsBatch([videoId], "snippet,statistics");
  return items || [];
};

/**
 * Fetch shorts using search + enrich with durations, then filter to real shorts.
 *
 * Rule:
 *  - If duration <= 61s -> short
 *  - Else if title/description contains #shorts/shorts AND duration <= 90s -> short
 */
export const fetchShortVideos = async ({ channelId, maxResults = 16, pageToken }) => {
  const key = getApiKey();

  const { data } = await youtubeApi.get("/search", {
    params: {
      key,
      channelId,
      part: "snippet",
      order: "date",
      maxResults,
      type: "video",
      videoDuration: "short",
      pageToken,
    },
  });

  const items = data?.items || [];
  const ids = items.map((it) => it?.id?.videoId).filter(Boolean);
  const details = await fetchVideoDetailsBatch(ids, "contentDetails");

  const durationById = new Map();
  for (const d of details) {
    const seconds = parseISODurationToSeconds(d?.contentDetails?.duration || "");
    durationById.set(d.id, seconds);
  }

  const enriched = items.map((it) => {
    const id = it?.id?.videoId;
    const seconds = durationById.get(id);
    const title = it?.snippet?.title || "";
    const desc = it?.snippet?.description || "";
    const looksLikeShort = textLooksLikeShort(title) || textLooksLikeShort(desc);

    const isShort =
      (typeof seconds === "number" && seconds <= 61) ||
      (looksLikeShort && typeof seconds === "number" && seconds <= 90) ||
      looksLikeShort; // fallback if duration unavailable

    return { ...it, _durationSeconds: seconds ?? null, _isShort: isShort };
  });

  const onlyShorts = enriched.filter((v) => v._isShort);

  return {
    items: onlyShorts,
    nextPageToken: data?.nextPageToken || null,
  };
};

/**
 * Fetch music/normal videos: channel search + enrich durations, then exclude shorts.
 *
 * Rule:
 *  - Keep videos with duration > 61s AND title/description does NOT look like shorts
 */
export const fetchMusicVideos = async ({ channelId, maxResults = 12, pageToken }) => {
  const { items, nextPageToken } = await fetchChannelVideos({
    channelId,
    maxResults,
    pageToken,
  });

  const ids = items.map((it) => it?.id?.videoId).filter(Boolean);
  const details = await fetchVideoDetailsBatch(ids, "contentDetails");

  const durationById = new Map();
  for (const d of details) {
    const seconds = parseISODurationToSeconds(d?.contentDetails?.duration || "");
    durationById.set(d.id, seconds);
  }

  const filtered = items.filter((it) => {
    const id = it?.id?.videoId;
    const seconds = durationById.get(id);
    const title = it?.snippet?.title || "";
    const desc = it?.snippet?.description || "";
    const looksLikeShort = textLooksLikeShort(title) || textLooksLikeShort(desc);

    // If duration missing, still try to exclude obvious shorts by text
    if (seconds == null) return !looksLikeShort;

    return seconds > 61 && !looksLikeShort;
  });

  return { items: filtered, nextPageToken };
};
