import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = `${title} | M1NOR FM`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}