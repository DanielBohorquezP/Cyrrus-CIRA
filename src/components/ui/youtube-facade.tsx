import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface YoutubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * Thumbnail + play button that only mounts the YouTube iframe on click, so
 * three embeds don't cost three iframes' worth of JS/network on page load.
 */
export function YoutubeFacade({ videoId, title, className }: YoutubeFacadeProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={cn("aspect-video w-full overflow-hidden rounded-2xl bg-navy", className)}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-2xl bg-navy",
        className,
      )}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover transition-[opacity] duration-200 ease-out group-hover:opacity-80"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-[background-color,transform] duration-150 ease-out group-hover:scale-105 group-hover:bg-white">
          <Play className="ml-1 h-6 w-6 fill-navy text-navy" strokeWidth={0} />
        </span>
      </span>
    </button>
  );
}
