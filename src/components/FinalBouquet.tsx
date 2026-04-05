import { motion } from "framer-motion";
import { useState } from "react";
import Flower from "./Flower";
import type { Arrangement, SelectedBloom } from "../types";

type FinalBouquetProps = {
  selectedBlooms: SelectedBloom[];
  arrangement: Arrangement;
  message: { dear: string; body: string; sincerely: string };
};

export default function FinalBouquet({
  selectedBlooms,
  arrangement,
  message,
}: FinalBouquetProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const copyLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const fallback = document.createElement("textarea");
        fallback.value = url;
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.focus();
        fallback.select();
        document.execCommand("copy");
        document.body.removeChild(fallback);
      }
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch {
      setStatus("idle");
    }
  };

  const shareLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Bloom Bouquet Builder",
          text: "I made this bouquet.",
          url,
        });
        setStatus("shared");
        window.setTimeout(() => setStatus("idle"), 1800);
        return;
      }
      await copyLink();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      await copyLink();
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center justify-center">
        {/* The Pale Yellow Circle Background */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-[#f4f2e2]" />

        {/* The Bouquet Stage */}
        <div className="relative mt-8 h-[440px] w-full pt-12">
          {/* Greenery / Leaves in the Background */}
          <svg
            className="absolute inset-0 h-[110%] w-full opacity-90 z-0"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M250 450 C230 350, 150 200, 100 150 C120 180, 180 280, 240 450"
              fill="#245136"
            />
            <path
              d="M260 450 C280 320, 360 180, 420 120 C390 160, 320 260, 270 450"
              fill="#1C402B"
            />
            <path
              d="M255 450 C250 300, 200 120, 200 80 C230 150, 265 250, 265 450"
              fill="#2A5C3D"
            />
            <path
              d="M245 450 C240 330, 290 140, 290 90 C260 170, 235 280, 235 450"
              fill="#1E4730"
            />
            <path
              d="M250 450 C180 380, 80 320, 50 300 C100 320, 180 390, 250 450"
              fill="#2A5C3D"
            />
            <path
              d="M260 450 C330 390, 430 340, 460 320 C410 340, 330 400, 260 450"
              fill="#1C402B"
            />

            {/* Some light wispy grass */}
            <path
              d="M240 450 C190 350, 100 280, 70 250"
              stroke="#CBA8CB"
              stroke-width="4"
              stroke-linecap="round"
              fill="none"
            />
            <path
              d="M260 450 C310 370, 400 300, 440 270"
              stroke="#E6C8E6"
              stroke-width="3"
              stroke-linecap="round"
              fill="none"
            />
            <path
              d="M230 450 C150 400, 60 380, 30 370"
              stroke="#CBA8CB"
              stroke-width="3"
              stroke-linecap="round"
              fill="none"
            />
            <path
              d="M270 450 C350 410, 440 390, 480 380"
              stroke="#E6C8E6"
              stroke-width="4"
              stroke-linecap="round"
              fill="none"
            />
          </svg>

          <div className="absolute bottom-4 left-1/2 z-10 h-[320px] w-[560px] -translate-x-1/2">
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
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  className="absolute bottom-4 left-1/2 select-none"
                  style={{ zIndex: position.zIndex }}
                >
                  <Flower
                    type={bloom.spriteName}
                    title={bloom.name}
                    className="w-44 -translate-x-1/2 origin-bottom drop-shadow-[0_12px_24px_rgba(40,40,40,0.25)]"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* The Physical Card under the bouquet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          className="relative z-50 -mt-8 w-[320px] bg-white border border-stone-800 p-5 shadow-none"
        >
          <div className="flex flex-col min-h-[90px] justify-between">
            <p className="font-mono text-[13px] font-bold text-stone-800 self-start pb-4">
              {message.dear ? `Dear ${message.dear},` : "Dear someone special,"}
            </p>
            {message.body && (
              <p className="mb-4 whitespace-pre-line font-mono text-[13px] leading-relaxed text-stone-800">
                {message.body}
              </p>
            )}
            <p className="font-mono text-[13px] font-bold text-stone-800 self-end text-right">
              {message.sincerely
                ? `Sincerely,\n${message.sincerely}`
                : "Sincerely,"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="mt-14 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="bg-black px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-stone-800"
        >
          {status === "copied" ? "COPIED" : "COPY LINK"}
        </button>
        <button
          type="button"
          onClick={shareLink}
          className="bg-white border border-black px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-black transition hover:bg-stone-100"
        >
          {status === "shared" ? "SHARED" : "SHARE"}
        </button>
      </div>
    </div>
  );
}
