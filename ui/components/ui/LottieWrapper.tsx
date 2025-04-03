"use client";

import { Player as LottiePlayer } from "@lottiefiles/react-lottie-player";

type LottieWrapperProps = {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown; // ✅ avoids `any`
};

export default function LottieWrapper({ src, ...props }: LottieWrapperProps) {
  return (
    <LottiePlayer
      autoplay
      loop
      src={src}
      style={{ height: "180px", width: "180px" }}
      {...props}
    />
  );
}
