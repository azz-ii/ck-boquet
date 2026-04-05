import { motion } from "framer-motion";
import Flower from "./Flower";
import type { Arrangement, SelectedBloom } from "../types";

type BouquetCanvasProps = {
  selectedBlooms: SelectedBloom[];
  arrangement: Arrangement;
  onRandomize: () => void;
};

export default function BouquetCanvas({
  selectedBlooms,
  arrangement,
  onRandomize,
}: BouquetCanvasProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-stone-500">
            Step 2
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-stone-800">
            Shape the bouquet
          </h2>
        </div>
        <button
          type="button"
          onClick={onRandomize}
          className="rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm text-stone-700 shadow-sm transition hover:border-stone-400 hover:bg-white"
        >
          Try a New Arrangement
        </button>
      </div>

      <div className="relative mx-auto flex h-[520px] w-full max-w-3xl items-end justify-center overflow-hidden rounded-[40px] border border-stone-200 bg-[radial-gradient(circle_at_center,_rgba(252,249,240,0.92),_rgba(246,241,228,0.98))] pb-12 shadow-paper">
        <div className="absolute inset-0 paper-texture opacity-40 z-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#c9d8b6]/45 to-transparent z-0" />

        <div className="relative z-10 h-full w-full max-w-[560px]">
          {selectedBlooms.map((bloom, index) => {
            const position = arrangement[bloom.slotId] ?? {
              top: 132,
              left: 0,
              rotate: 0,
              scale: 1,
              zIndex: index + 20,
            };

            return (
              <motion.div
                key={bloom.slotId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: -position.top,
                  x: position.left,
                  rotate: position.rotate,
                  scale: position.scale,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="absolute bottom-6 left-1/2 select-none"
                style={{ zIndex: position.zIndex }}
              >
                <Flower
                  type={bloom.spriteName}
                  title={bloom.name}
                  className="w-44 origin-bottom -translate-x-1/2 drop-shadow-[0_16px_24px_rgba(63,58,45,0.16)]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
