export type FlowerType =
  | "yellow_cosmos"
  | "pink_peony_1"
  | "pink_peony_2"
  | "daisy_cluster"
  | "blue_buds"
  | "dahlia"
  | "pink_lily"
  | "orange_marigold";

export type FlowerOption = {
  id: string;
  name: string;
  meaning: string;
  spriteName: FlowerType;
  imageSrc: string;
  accent: string;
};

export type SelectedBloom = FlowerOption & {
  slotId: string;
};

export type Arrangement = Record<
  string,
  {
    top: number;
    left: number;
    rotate: number;
    scale: number;
    zIndex: number;
  }
>;

export type BouquetStep = "selection" | "customization" | "message" | "final";

export type BouquetState = {
  step: BouquetStep;
  selectedBlooms: SelectedBloom[];
  arrangement: Arrangement;
  message: {
    dear: string;
    body: string;
    sincerely: string;
  };
  warning: string | null;
};
