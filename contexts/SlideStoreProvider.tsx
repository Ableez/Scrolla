import {
  createCardSlideStore,
  CardSlideStore,
  initCardSlideStore,
} from "@/store/card-slide";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

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
  }

  return (
    <CardSlideContext.Provider value={slideStore.current}>
      {children}
    </CardSlideContext.Provider>
  );
};

export const useCardSlideState = <T,>(
  selector: (store: CardSlideStore) => T
): T => {
  const cardSlideStore = useContext(CardSlideContext);

  if (!cardSlideStore) {
    throw new Error(`useCardSlideState must be used within CardSlideProvider`);
  }

  return useStore(cardSlideStore, selector);
};
