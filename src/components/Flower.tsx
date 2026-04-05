import type { CSSProperties } from "react";
import type { FlowerType } from "../types";
import flowerSheetUrl from "./flower-sprite-sheet.png";

type SpriteFrame = {
  backgroundPosition: string;
  aspectRatio: string;
};

export const FLOWER_SPRITE_MAP: Record<FlowerType, SpriteFrame> = {
  yellow_cosmos: { backgroundPosition: "0% 0%", aspectRatio: "1587 / 2245" },
  pink_peony_1: { backgroundPosition: "50% 0%", aspectRatio: "1587 / 2245" },
  pink_peony_2: { backgroundPosition: "100% 0%", aspectRatio: "1587 / 2245" },
  daisy_cluster: { backgroundPosition: "0% 50%", aspectRatio: "1587 / 2245" },
  blue_buds: { backgroundPosition: "50% 50%", aspectRatio: "1587 / 2245" },
  dahlia: { backgroundPosition: "100% 50%", aspectRatio: "1587 / 2245" },
  pink_lily: { backgroundPosition: "0% 100%", aspectRatio: "1587 / 2245" },
  orange_marigold: {
    backgroundPosition: "50% 100%",
    aspectRatio: "1587 / 2245",
  },
};

type FlowerProps = {
  type: FlowerType;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export default function Flower({ type, className, style, title }: FlowerProps) {
  const sprite = FLOWER_SPRITE_MAP[type];

  return (
    <span
      role={title ? "img" : undefined}
      aria-label={title}
      className={[
        "inline-block shrink-0 bg-no-repeat bg-center align-middle overflow-visible",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        aspectRatio: sprite.aspectRatio,
        backgroundImage: `url(${flowerSheetUrl})`,
        backgroundPosition: sprite.backgroundPosition,
        backgroundSize: "300% 300%",
        ...style,
      }}
    />
  );
}
