import type { ChangeEvent } from "react";

type MessageCardProps = {
  dear: string;
  body: string;
  sincerely: string;
  onChange: (next: {
    dear?: string;
    body?: string;
    sincerely?: string;
  }) => void;
};

export default function MessageCard({
  dear,
  body,
  sincerely,
  onChange,
}: MessageCardProps) {
  const handleChange =
    (field: "dear" | "body" | "sincerely") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ [field]: event.target.value });
    };

  return (
    <div className="mx-auto flex w-full max-w-2xl justify-center">
      <div className="w-full rounded-[34px] border border-stone-200 bg-white p-5 shadow-paper sm:p-8">
        <div className="paper-texture rounded-[28px] border border-stone-100 bg-[#fffdfa] p-5 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.36em] text-stone-500">
            Step 3
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-stone-800">
            Write your card
          </h2>

          <div className="mt-6 space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-600">Dear</span>
              <input
                value={dear}
                onChange={handleChange("dear")}
                placeholder="Dear Mum"
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-mono text-base text-stone-700 outline-none transition focus:border-stone-400"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-600">
                Message
              </span>
              <textarea
                value={body}
                onChange={handleChange("body")}
                rows={6}
                placeholder="A note about why this bouquet feels right..."
                className="w-full resize-none rounded-3xl border border-stone-200 bg-white px-4 py-3 font-mono text-base leading-6 text-stone-700 outline-none transition focus:border-stone-400"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-600">
                Sincerely
              </span>
              <input
                value={sincerely}
                onChange={handleChange("sincerely")}
                placeholder="Your Name"
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-mono text-base text-stone-700 outline-none transition focus:border-stone-400"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
