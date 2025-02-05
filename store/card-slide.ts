import { CardContentType, OptionsContent } from "#/_mock_/swipe-data";
import { createStore } from "zustand";

export type CardType = {
  viewed?: boolean;
} & CardContentType;

export type QuestionCard = {
  id: string;
  score: 0 | 1;
  answered: boolean;
  selectedOption: number | null;
  answerChecked: boolean;
};

export type CardSlideState = {
  currentCardIndex: number;
  cards: CardType[];
  isComplete: boolean;
  highestViewedIndex: number;
  progress: number;
  isLoading: boolean;
  questionCards: QuestionCard[];
  error: string | null;
  disableSwipe: boolean;
  maxAllowedIndex: number;
};

export type CardSlideActions = {
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
  updateState: (state: Partial<CardSlideState>) => void;
  handleQuestionAnswer: (questionId: string, optionIndex: number) => void;
  removeAnsweredQuestion: (id: string) => void;
  selectOption: (questionId: string, optionIndex: number) => void;
  isAnswered: (questionId: string) => boolean;
  questionCards: QuestionCard[];
  updateMaxAllowedIndex: () => void;
  updateCard: (id: string, fields: Partial<CardType>) => void;
  checkAnswer: (questionId: string) => void;
  canMoveToNextCard: () => boolean;
};

const defaultCardSlideState: CardSlideState = {
  currentCardIndex: 0,
  cards: [],
  disableSwipe: false,
  error: null,
  highestViewedIndex: 0,
  isComplete: false,
  isLoading: false,
  progress: 0,
  questionCards: [],
  maxAllowedIndex: 0,
};

export type CardSlideStore = CardSlideState & CardSlideActions;

export const createCardSlideStore = (
  initialState: CardSlideState = defaultCardSlideState
) => {
  return createStore<CardSlideStore>((set, get) => ({
    ...initialState,
    canMoveToNextCard: () => {
      const { currentCardIndex, cards, questionCards } = get();
      const currentCard = cards[currentCardIndex];

      // If not a question card, always allow movement
      if (!currentCard || currentCard.type !== "qa") return true;

      // Find the question element in the current card
      const questionElement = currentCard.elements.find(
        (e) => e.type === "options"
      );
      if (!questionElement) return true;

      // Check if the question has been answered and checked
      const questionState = questionCards.find(
        (q) => q.id === questionElement.id
      );
      return questionState?.answerChecked ?? false;
    },
    updateCard: (id, fields) => {
      const { cards } = get();
      const card = cards.find((c) => c.id === id);
      if (!card) return;

      const updated = { ...card, ...fields };

      set({ cards: cards.map((c) => (c.id === id ? updated : c)) });
    },
    updateMaxAllowedIndex: () => {
      // console.log("[Store] Calculating maxAllowedIndex...");
      const { cards, questionCards } = get();
      let newMax = 0;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (card && card?.type === "qa") {
          const questionId = card?.elements.find(
            (e) => e.type === "options"
          )?.id;
          const isAnswered =
            questionId &&
            questionCards.some((q) => q.id === questionId && q.answerChecked);

          console.log(`[Store] Card ${i} (QA) - Answered: ${isAnswered}`);
          if (!isAnswered) break;
        }
        newMax = i;
      }

      console.log(`[Store] New maxAllowedIndex: ${newMax}`);
      set({ maxAllowedIndex: newMax });
    },
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
    handleQuestionAnswer: (questionId: string, optionIndex: number) => {
      set((state) => ({
        questionCards: state.questionCards.map((q) =>
          q.id === questionId
            ? {
                ...q,
                selectedOption: optionIndex,
                answered: true,
                answerChecked: false,
              }
            : q
        ),
      }));
    },

    checkAnswer: (questionId: string) => {
      const { cards, questionCards } = get();
      const question = cards
        .find((card) =>
          card.elements.some((e) => e.type === "options" && e.id === questionId)
        )
        ?.elements.find(
          (e) => e.type === "options" && e.id === questionId
        ) as unknown as OptionsContent;

      if (!question) return;

      const questionState = questionCards.find((q) => q.id === questionId);
      if (!questionState?.answered) return;

      const isCorrect = questionState.selectedOption === question.correctAnswer;

      set((state) => ({
        questionCards: state.questionCards.map((q) =>
          q.id === questionId
            ? {
                ...q,
                score: isCorrect ? 1 : 0,
                answerChecked: true,
              }
            : q
        ),
      }));

      // Update maxAllowedIndex after checking answer
      get().updateMaxAllowedIndex();
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

export const initCardSlideStore = (): CardSlideState => {
  const store: CardSlideState = defaultCardSlideState;
  return store;
};
