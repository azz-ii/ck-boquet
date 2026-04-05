import { motion } from "framer-motion";
import Flower from "./Flower";
import type { FlowerOption, SelectedBloom } from "../types";

type FlowerSelectorProps = {
  flowers: FlowerOption[];
  selectedBlooms: SelectedBloom[];
  warning: string | null;
  onToggleFlower: (flower: FlowerOption) => void;
  onNext: () => void;
};

export default function FlowerSelector({
  flowers,
  selectedBlooms,
  warning,
  onToggleFlower,
  onNext,
}: FlowerSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            Step 1
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-800">
            Choose up to ten blooms
          </h2>
        </div>
        <div className="rounded-full border border-stone-300/80 bg-white/80 px-4 py-2 text-sm text-stone-600 shadow-sm">
          {selectedBlooms.length}/10 selected
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {flowers.map((flower) => {
          const isSelected = selectedBlooms.some(
            (item) => item.id === flower.id,
          );

          return (
            <motion.button
              key={flower.id}
              type="button"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggleFlower(flower)}
              className={`group relative overflow-hidden rounded-[28px] border p-4 text-left shadow-sm transition-colors ${
                isSelected
                  ? "border-stone-700 bg-white"
                  : "border-stone-200 bg-white/75 hover:border-stone-300 hover:bg-white"
              }`}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top right, ${flower.accent}30, transparent 50%)`,
                }}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-stone-800">
                    {flower.name}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-stone-500">
                    {flower.meaning}
                  </p>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium ${isSelected ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-600"}`}
                >
                  {isSelected ? "Selected" : "Add"}
                </div>
              </div>
              <div className="relative mt-5 flex justify-center">
                <Flower
                  type={flower.spriteName}
                  title={flower.name}
                  className="w-28 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-[28px] border border-stone-200 bg-white/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6 text-sm text-rose-700">
          {warning ?? "Select at least six blooms to continue."}
        </div>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-stone-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
