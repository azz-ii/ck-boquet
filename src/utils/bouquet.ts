import type { Arrangement, SelectedBloom } from "../types";

type Slot = {
  top: number;
  left: number;
  rotate: number;
  scale: number;
  zIndex: number;
};

const BOUQUET_SLOTS: Slot[] = [
  { top: 152, left: 0, rotate: 0, scale: 1.16, zIndex: 38 },
  { top: 146, left: -58, rotate: -12, scale: 1.1, zIndex: 35 },
  { top: 146, left: 58, rotate: 12, scale: 1.1, zIndex: 35 },
  { top: 134, left: -102, rotate: -22, scale: 1.03, zIndex: 30 },
  { top: 134, left: 102, rotate: 22, scale: 1.03, zIndex: 30 },
  { top: 124, left: -28, rotate: -6, scale: 0.98, zIndex: 28 },
  { top: 124, left: 28, rotate: 6, scale: 0.98, zIndex: 28 },
  { top: 114, left: -132, rotate: -30, scale: 0.9, zIndex: 22 },
  { top: 114, left: 132, rotate: 30, scale: 0.9, zIndex: 22 },
  { top: 106, left: 0, rotate: 0, scale: 0.86, zIndex: 20 },
];

const getSlot = (index: number): Slot => {
  const preset = BOUQUET_SLOTS[index];
  if (preset) {
    return preset;
  }

  const ringIndex = index - BOUQUET_SLOTS.length + 1;
  const direction = ringIndex % 2 === 0 ? 1 : -1;
  const distance = 144 + Math.floor(ringIndex / 2) * 22;

  return {
    top: 102,
    left: distance * direction,
    rotate: 30 * direction,
    scale: 0.84,
    zIndex: 18,
  };
};

export const buildArrangement = (blooms: SelectedBloom[]): Arrangement => {
  return blooms.reduce<Arrangement>((accumulator, bloom, index) => {
    const slot = getSlot(index);

    accumulator[bloom.slotId] = {
      top: slot.top,
      left: slot.left,
      rotate: slot.rotate,
      scale: slot.scale,
      zIndex: slot.zIndex,
    };

    return accumulator;
  }, {});
};

export const randomizeArrangement = (blooms: SelectedBloom[]): Arrangement => {
  // Instead of randomness, let's just cycle the Z-index or swap order slightly
  // to give a "new arrangement" feel while remaining structured and pleasing.
  const shuffled = [...blooms].sort(() => Math.random() - 0.5);
  return buildArrangement(shuffled);
};
