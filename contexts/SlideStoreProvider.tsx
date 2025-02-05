import {
  createCardSlideStore,
  CardSlideStore,
  initCardSlideStore,
} from "#/store/card-slide";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type CardSlideState = ReturnType<typeof createCardSlideStore>;

export const CardSlideContext = createContext<CardSlideState | undefined>(
  undefined
);

export type CardSlideProviderProps = {
  children: ReactNode;
};

export const CardSlideProvider = ({ children }: CardSlideProviderProps) => {
  const slideStore = useRef<CardSlideState>();

  if (!slideStore.current) {
    slideStore.current = createCardSlideStore(initCardSlideStore());
    console.log("");
    console.log("");
    console.log("[Provider] Initializing new store instance");
    console.log("");
    console.log("");
  }

  return (
    <CardSlideContext.Provider value={slideStore.current}>
      {children}
    </CardSlideContext.Provider>
  );
};

export const useCardSlideState = <T,>(
  selector: (store: CardSlideStore) => T,
  caller?: string
): T => {
  const cardSlideStore = useContext(CardSlideContext);
  const shallowSelector = useShallow(selector);

  if (!cardSlideStore) {
    console.error("[Hook] Used outside of Provider!");
    throw new Error(`useCardSlideState must be used within CardSlideProvider`);
  }

  // console.log(":::STORE_USED:::", caller);
  return useStore(cardSlideStore, shallowSelector);
};
