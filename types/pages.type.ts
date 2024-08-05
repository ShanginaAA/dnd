export type FormPages = {
  id: number;
  page: number;
  questionIds: Array<number>;
};

export type QuestionIdPage = {
  id: number;
  destination_index: number;
  questionId: number;
};

export type PagePosition = {
  start_index: number;
  end_index: number;
};

export type PlaceholderProps = {
  clientHeight: number;
  clientWidth: number;
  clientY: number;
  clientX: number;
};
