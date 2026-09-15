import Image from "next/image";
import { DocsImageProps } from "@/components/docs/types";

export default function DocsImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: DocsImageProps) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
