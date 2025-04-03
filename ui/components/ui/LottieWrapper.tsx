// File: /components/ui/LottieWrapper.tsx
"use client";

import { Player as LottiePlayer } from "@lottiefiles/react-lottie-player";

export default function LottieWrapper({
  src,
  className,
  ...props
}: {
  src: string;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <LottiePlayer
      autoplay
      loop
      src={src}
      style={{ height: "180px", width: "180px" }}
      className={className}
      {...props}
    />
  );
}
