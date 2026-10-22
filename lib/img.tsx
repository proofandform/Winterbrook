import Image, { ImageProps } from "next/image";
import manifest from "./image-manifest.json";
import newsManifest from "./news-image-manifest.json";

type Manifest = Record<string, { width: number; height: number; blurDataURL: string }>;
const images: Manifest = { ...manifest, ...newsManifest };

interface WbImageProps extends Omit<ImageProps, "src" | "width" | "height" | "blurDataURL"> {
  /** Filename inside /public/images. */
  src: string;
}

/** Uses intrinsic image dimensions and build-time blur placeholders. */
export function WbImage({ src, alt, fill, ...rest }: WbImageProps) {
  const meta = images[src];
  if (!meta) throw new Error(`Unknown image: ${src}`);
  return (
    <Image
      src={`/images/${src}`}
      alt={alt}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      {...(fill ? { fill: true } : { width: meta.width, height: meta.height })}
      {...rest}
    />
  );
}
