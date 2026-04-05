import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useReducer, useState } from "react";
import BouquetCanvas from "./components/BouquetCanvas";
import FinalBouquet from "./components/FinalBouquet";
import FlowerSelector from "./components/FlowerSelector";
import MessageCard from "./components/MessageCard";
import ProgressBar from "./components/ProgressBar";
import { FLOWERS } from "./data/flowers";
import { buildArrangement, randomizeArrangement } from "./utils/bouquet";
import type {
  BouquetState,
  BouquetStep,
  FlowerOption,
  SelectedBloom,
} from "./types";

type Action =
  | { type: "SELECT_FLOWER"; flower: FlowerOption }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RANDOMIZE_ARRANGEMENT" }
  | {
      type: "UPDATE_MESSAGE";
      payload: { dear?: string; body?: string; sincerely?: string };
    }
  | { type: "SET_WARNING"; warning: string | null };

const TOTAL_STEPS = 4;

const stepOrder: BouquetStep[] = [
  "selection",
  "customization",
  "message",
  "final",
];

const createSelectedBloom = (flower: FlowerOption): SelectedBloom => ({
  ...flower,
  slotId: `${flower.id}-${crypto.randomUUID()}`,
});

const initialState = (): BouquetState => {
  try {
    // Check search params first, then fall back to checking if it's in the hash
    const params = new URLSearchParams(window.location.search);
    let bData = params.get("b");
    if (!bData && window.location.hash.includes("?b=")) {
      bData = new URLSearchParams(window.location.hash.split("?")[1]).get("b");
    }
    if (!bData) {
      const url = new URL(window.location.href);
      bData = url.searchParams.get("b");
    }

    if (bData) {
      // Revert URL-safe base64 characters AND preserve old '+' formatted strings
      const base64 = bData.replace(/-/g, '+').replace(/_/g, '/').replace(/ /g, '+');
      const decoded = JSON.parse(decodeURIComponent(atob(base64)));

      const selectedBlooms: SelectedBloom[] = [];
      for (const bloomData of decoded.s) {
        const flower = FLOWERS.find((f) => f.id === bloomData.id);
        if (flower) {
          selectedBlooms.push({ ...flower, slotId: bloomData.sId });
        }
      }

      if (selectedBlooms.length > 0) {
        return {
          step: "final",
          selectedBlooms,
          arrangement: decoded.a || {},
          message: decoded.m || { dear: "", body: "", sincerely: "" },
          warning: null,
          isSharedView: true,
        };
      }
    }
  } catch (e) {
    console.error("Failed to parse shared bouquet", e);
  }

  return {
    step: "selection",
    selectedBlooms: [],
    arrangement: {},
    message: {
      dear: "",
      body: "",
      sincerely: "",
    },
    warning: null,
  };
};

function reducer(state: BouquetState, action: Action): BouquetState {
  switch (action.type) {
    case "SELECT_FLOWER": {
      const existingIndex = state.selectedBlooms.findIndex(
        (bloom) => bloom.id === action.flower.id,
      );
      if (existingIndex >= 0) {
        const selectedBlooms = state.selectedBlooms.filter(
          (bloom) => bloom.id !== action.flower.id,
        );
        const nextArrangement = { ...state.arrangement };
        const nextBloom = state.selectedBlooms[existingIndex];
        delete nextArrangement[nextBloom.slotId];
        return {
          ...state,
          selectedBlooms,
          arrangement: nextArrangement,
          warning: null,
        };
      }

      if (state.selectedBlooms.length >= 10) {
        return {
          ...state,
          warning: "You can choose up to 10 blooms for this bouquet.",
        };
      }

      const selectedBlooms = [
        ...state.selectedBlooms,
        createSelectedBloom(action.flower),
      ];
      return {
        ...state,
        selectedBlooms,
        arrangement: buildArrangement(selectedBlooms),
        warning: null,
      };
    }
    case "NEXT_STEP": {
      const currentIndex = stepOrder.indexOf(state.step);
      const nextStep =
        stepOrder[Math.min(currentIndex + 1, stepOrder.length - 1)];
      return {
        ...state,
        step: nextStep,
        warning: null,
      };
    }
    case "PREV_STEP": {
      const currentIndex = stepOrder.indexOf(state.step);
      const previousStep = stepOrder[Math.max(currentIndex - 1, 0)];
      return {
        ...state,
        step: previousStep,
        warning: null,
      };
    }
    case "RANDOMIZE_ARRANGEMENT":
      return {
        ...state,
        arrangement: randomizeArrangement(state.selectedBlooms),
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        message: {
          ...state.message,
          ...action.payload,
        },
      };
    case "SET_WARNING":
      return {
        ...state,
        warning: action.warning,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [selectionHint, setSelectionHint] = useState<string | null>(null);

  const currentStepIndex = stepOrder.indexOf(state.step) + 1;
  const canGoBack = currentStepIndex > 1;
  const canGoNext = currentStepIndex < TOTAL_STEPS;

  const selectedCountLabel = useMemo(() => {
    return `${state.selectedBlooms.length} bloom${state.selectedBlooms.length === 1 ? "" : "s"}`;
  }, [state.selectedBlooms.length]);

  const handleToggleFlower = (flower: FlowerOption) => {
    dispatch({ type: "SELECT_FLOWER", flower });
    setSelectionHint(null);
  };

  const handleSelectionNext = () => {
    if (state.selectedBlooms.length < 6) {
      setSelectionHint("Pick at least 6 blooms before moving on.");
      return;
    }

    setSelectionHint(null);
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const handleNext = () => {
    if (state.step === "selection") {
      handleSelectionNext();
      return;
    }

    dispatch({ type: "NEXT_STEP" });
  };

  const isSharedView = state.isSharedView;

  return (
    <div className="min-h-screen px-4 py-6 text-stone-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {!isSharedView && (
          <>
            <header className="mb-6 flex flex-col gap-4 rounded-[36px] border border-stone-200 bg-white/70 px-6 py-5 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
                  Bloom Bouquet Builder
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-800 sm:text-5xl">
                  Shape a bouquet with a hand-drawn feel
                </h1>
              </div>
              <div className="rounded-full border border-stone-300/80 bg-[#fffdfa] px-4 py-2 text-sm text-stone-600 shadow-sm">
                {selectedCountLabel}
              </div>
            </header>

            <ProgressBar
              currentStep={currentStepIndex}
              totalSteps={TOTAL_STEPS}
              onBack={handleBack}
              onNext={handleNext}
              canGoBack={canGoBack}
              canGoNext={canGoNext}
            />
          </>
        )}

        <main
          className={`mt-6 rounded-[44px] ${!isSharedView ? "border border-stone-200 bg-white/55 p-4 shadow-paper backdrop-blur sm:p-6" : ""}`}
        >
          <AnimatePresence mode="wait">
            {state.step === "selection" && (
              <motion.section
                key="selection"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <FlowerSelector
                  flowers={FLOWERS}
                  selectedBlooms={state.selectedBlooms}
                  warning={selectionHint ?? state.warning}
                  onToggleFlower={handleToggleFlower}
                  onNext={handleSelectionNext}
                />
              </motion.section>
            )}

            {state.step === "customization" && (
              <motion.section
                key="customization"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <BouquetCanvas
                  selectedBlooms={state.selectedBlooms}
                  arrangement={state.arrangement}
                  onRandomize={() =>
                    dispatch({ type: "RANDOMIZE_ARRANGEMENT" })
                  }
                />
              </motion.section>
            )}

            {state.step === "message" && (
              <motion.section
                key="message"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <MessageCard
                  dear={state.message.dear}
                  body={state.message.body}
                  sincerely={state.message.sincerely}
                  onChange={(payload) =>
                    dispatch({ type: "UPDATE_MESSAGE", payload })
                  }
                />
              </motion.section>
            )}

            {state.step === "final" && (
              <motion.section
                key="final"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.22 }}
              >
                <FinalBouquet
                  selectedBlooms={state.selectedBlooms}
                  arrangement={state.arrangement}
                  message={state.message}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
