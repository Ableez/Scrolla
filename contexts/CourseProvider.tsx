import {
  createCoursesStore,
  CoursesStoreType,
  initCoursesStore,
} from "@/store/courses-store";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

export type CoursesState = ReturnType<typeof createCoursesStore>;

export const CoursesContext = createContext<CoursesState | undefined>(
  undefined
);

export type CoursesProviderProps = {
  children: ReactNode;
};

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  const slideStore = useRef<CoursesState>();
  if (!slideStore.current) {
    slideStore.current = createCoursesStore(initCoursesStore());
  }

  return (
    <CoursesContext.Provider value={slideStore.current}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesState = <T,>(
  selector: (store: CoursesStoreType) => T
): T => {
  const coursesStore = useContext(CoursesContext);

  if (!coursesStore) {
    throw new Error(`useCoursesState must be used within CoursesProvider`);
  }

  return useStore(coursesStore, selector);
};
