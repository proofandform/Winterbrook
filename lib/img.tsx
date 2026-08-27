import Image, { ImageProps } from "next/image";
import manifest from "./image-manifest.json";

type Manifest = Record<string, { width: number; height: number; blurDataURL: string }>;
const images = manifest as Manifest;

interface WbImageProps extends Omit<ImageProps, "src" | "width" | "height" | "blurDataURL"> {
  /** Filename inside /public/images, e.g. "4059_077d.jpg" */
  src: string;
}

/**
 * next/image wrapper that pulls intrinsic dimensions and a blur placeholder
 * from the build-time manifest, so callers only pass the filename.
 */
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
