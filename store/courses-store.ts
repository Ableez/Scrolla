import { CardContentType } from "@/_mock_/swipe-data";
import { createStore } from "zustand";

export type CoursesState = {
  currentCardIndex: number;
  cards: CardContentType[];
  isComplete: boolean;
  highestViewedIndex: number;
  progress: number;
  isLoading: boolean;
  questionCards: {
    id: string;
    score: 0 | 1;
    answered: boolean;
    selectedOption: number | null;
    answerChecked: boolean;
  }[];
  error: string | null;
  disableSwipe: boolean;
};

export type CoursesActions = {
  goToNextCard: () => void;
  goToPreviousCard: () => void;
  goToCard: (index: number) => void;
  setCards: (cards: CardContentType[]) => void;
  setIsComplete: (isComplete: boolean) => void;
  setHighestViewedIndex: (index: number) => void;
  setProgress: (progress: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setDisableSwipe: (disableSwipe: boolean) => void;
  setCurrentCardIndex: (index: number) => void;
  updateState: (state: Partial<CoursesState>) => void;
  addAnsweredQuestion: (question: {
    id: string;
    score: 0 | 1;
    answered: boolean;
    selectedOption: number | null;
    answerChecked: boolean;
  }) => void;
  removeAnsweredQuestion: (id: string) => void;
  selectOption: (questionId: string, optionIndex: number) => void;
  isAnswered: (questionId: string) => boolean;
};

const CoursesState: CoursesState = {
  currentCardIndex: 0,
  cards: [],
  disableSwipe: false,
  error: null,
  highestViewedIndex: 0,
  isComplete: false,
  isLoading: false,
  progress: 0,
  questionCards: [],
};

export type CoursesStoreType = CoursesState & CoursesActions;

export const createCoursesStore = (initialState: CoursesState = CoursesState) => {
  return createStore<CoursesStoreType>((set, get) => ({
    ...initialState,
    goToNextCard: () => {
      const { currentCardIndex, cards } = get();
      const nextIndex = Math.min(currentCardIndex + 1, cards.length - 1);
      set({ currentCardIndex: nextIndex });
    },
    goToPreviousCard: () => {
      const { currentCardIndex } = get();
      const prevIndex = Math.max(currentCardIndex - 1, 0);
      set({ currentCardIndex: prevIndex });
    },
    goToCard: (index: number) => set({ currentCardIndex: index }),
    setCards: (cards) => set({ cards }),
    setIsComplete: (isComplete) => set({ isComplete }),
    setHighestViewedIndex: (index) => set({ highestViewedIndex: index }),
    setProgress: (progress) => set({ progress }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setDisableSwipe: (disableSwipe) => set({ disableSwipe }),
    setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
    updateState: (state) => set((prev) => ({ ...prev, ...state })),
    addAnsweredQuestion: (answer) => {
      if (get().questionCards.find((qa) => qa.id === answer.id)) {
        set((prev) => ({
          ...prev,
          questionCards: prev.questionCards.map((qa) => {
            if (qa.id === answer.id) {
              return {
                ...answer,
              };
            }
            return qa;
          }),
        }));
        return;
      }

      set((prev) => ({
        ...prev,
        questionCards: [...prev.questionCards, answer],
      }));
    },
    removeAnsweredQuestion: (id) =>
      set((prev) => ({
        ...prev,
        questionCards: prev.questionCards.filter((qa) => qa.id !== id),
      })),
    selectOption: (questionId, optionIndex) =>
      set((prev) => ({
        ...prev,
        questionCards: prev.questionCards.map((qa) => {
          if (qa.id === questionId) {
            return {
              ...qa,
              selectedOption: optionIndex,
              answered: true,
            };
          }
          return qa;
        }),
      })),
    isAnswered: (questionId) =>
      get().questionCards.some(
        (qa) => qa.id === questionId && qa.answerChecked
      ),
  }));
};

export const initCoursesStore = (): CoursesState => {
  const store: CoursesState = CoursesState;
  return store;
};
