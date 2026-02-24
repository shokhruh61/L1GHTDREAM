import YouTubeVideos from "../components/music/YouTubeVideos";
import SectionHeading from "../components/ui/SectionHeading";
import { usePageMeta } from "../hooks/usePageMeta";

const CHANNEL_ID = "UCcSWtzdfWI77YBl7vTV83OA";

export default function Music() {
  usePageMeta("Music", "Browse music videos from YouTube on M1NOR FM.");

  return (
    <section>
      <SectionHeading
        eyebrow="Music"
        title="Stream The Sound"
        description="Music videos are loaded directly from YouTube API."
      />

      <YouTubeVideos channelIds={CHANNEL_ID} maxResults={12} hidePagination />
    </section>
  );
}
