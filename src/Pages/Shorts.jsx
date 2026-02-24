import ShortsGrid from "../components/Shorts";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Shorts() {
  usePageMeta("Shorts", "Browse shorts loaded from YouTube API on M1NOR FM.");
  return <ShortsGrid />;
}
