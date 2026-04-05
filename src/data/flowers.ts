import type { FlowerOption } from "../types";

const createFlowerSvg = (
  label: string,
  petalColor: string,
  centerColor: string,
) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none">
      <rect width="240" height="240" rx="32" fill="transparent"/>
      
      <!-- Stem and Leaf -->
      <path d="M120 100 V174" stroke="#728b58" stroke-width="8" stroke-linecap="round" />
      <path d="M102 148 L138 132" stroke="#728b58" stroke-width="7" stroke-linecap="round" />
      
      <g transform="translate(120 100)">
        <!-- 5 Minimalist Petals Arrayed in an Arc -->
        <ellipse cx="0" cy="-28" rx="16" ry="28" fill="${petalColor}" transform="rotate(-115)" />
        <ellipse cx="0" cy="-28" rx="16" ry="28" fill="${petalColor}" transform="rotate(-58)" />
        <ellipse cx="0" cy="-28" rx="16" ry="28" fill="${petalColor}" transform="rotate(0)" />
        <ellipse cx="0" cy="-28" rx="16" ry="28" fill="${petalColor}" transform="rotate(58)" />
        <ellipse cx="0" cy="-28" rx="16" ry="28" fill="${petalColor}" transform="rotate(115)" />
        
        <!-- Flower Center -->
        <circle r="14" fill="${centerColor}" />
      </g>
      
      <!-- Flower Name Label matching the mockup text style -->
      <text x="120" y="208" fill="#7a6c55" font-size="15" font-family="Georgia, serif" text-anchor="middle">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const FLOWERS: FlowerOption[] = [
  {
    id: "yellow_cosmos",
    name: "Yellow Cosmos",
    meaning: "Warm joy and light-hearted affection",
    spriteName: "yellow_cosmos",
    imageSrc: createFlowerSvg("Yellow Cosmos", "#F7E07A", "#C8921E"),
    accent: "#E8D99A",
  },
  {
    id: "pink_peony_1",
    name: "Pink Peony 1",
    meaning: "Soft romance and graceful abundance",
    spriteName: "pink_peony_1",
    imageSrc: createFlowerSvg("Pink Peony", "#F2A9B4", "#B86D77"),
    accent: "#E896A5",
  },
  {
    id: "pink_peony_2",
    name: "Pink Peony 2",
    meaning: "Elegant sweetness and heartfelt beauty",
    spriteName: "pink_peony_2",
    imageSrc: createFlowerSvg("Pink Peony", "#F2BCD2", "#B55E86"),
    accent: "#E9A7C9",
  },
  {
    id: "daisy_cluster",
    name: "Daisy Cluster",
    meaning: "Pure affection and loyal friendship",
    spriteName: "daisy_cluster",
    imageSrc: createFlowerSvg("Daisy Cluster", "#F5EBC0", "#C9A23F"),
    accent: "#E8D9AE",
  },
  {
    id: "blue_buds",
    name: "Blue Buds",
    meaning: "Hope, calm, and new beginnings",
    spriteName: "blue_buds",
    imageSrc: createFlowerSvg("Blue Buds", "#9FC8F3", "#5F84B5"),
    accent: "#A7C7E8",
  },
  {
    id: "dahlia",
    name: "Dahlia",
    meaning: "Creative strength and sculpted grace",
    spriteName: "dahlia",
    imageSrc: createFlowerSvg("Dahlia", "#F2C57C", "#B97325"),
    accent: "#F0B95E",
  },
  {
    id: "pink_lily",
    name: "Pink Lily",
    meaning: "Tender devotion and renewal",
    spriteName: "pink_lily",
    imageSrc: createFlowerSvg("Pink Lily", "#F3B2CF", "#C87CA9"),
    accent: "#EAB1D0",
  },
  {
    id: "orange_marigold",
    name: "Orange Marigold",
    meaning: "Warm remembrance and bright celebration",
    spriteName: "orange_marigold",
    imageSrc: createFlowerSvg("Orange Marigold", "#FFB347", "#C96F1A"),
    accent: "#F3B363",
  },
];
