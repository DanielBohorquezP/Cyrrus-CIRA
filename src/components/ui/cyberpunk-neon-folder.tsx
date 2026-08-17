import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface CyberpunkNeonFolderProps {
  className?: string;
  label?: string;
}

export function CyberpunkNeonFolder({ className, label = "CYRRUS" }: CyberpunkNeonFolderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="folder-container-neon">
        <div className="doc-sheet sheet-1" />
        <div className="doc-sheet sheet-2" />
        <div className="doc-sheet sheet-3" />

        <div className="folder-card-neon">
          <div className="flex h-full items-center justify-center">
            <div className="flex items-center gap-3">
              <Folder className="folder-icon-neon h-7 w-7" strokeWidth={1.5} />
              <h2 className="folder-title-neon text-lg font-semibold">{label}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
