import YouTubeVideos from "../components/music/YouTubeVideos";
import SectionHeading from "../components/ui/SectionHeading";
import { usePageMeta } from "../hooks/usePageMeta";

const CHANNEL_ID = "UCcSWtzdfWI77YBl7vTV83OA";

export default function Videos() {
  usePageMeta("Videos", "Watch videos loaded from YouTube on M1NOR FM.");

  return (
    <section>
      <SectionHeading
        eyebrow="Videos"
        title="Visual Stories"
        description="Video list is loaded directly from YouTube API."
      />

      <YouTubeVideos channelIds={CHANNEL_ID} maxResults={16} hidePagination />
    </section>
  );
}
