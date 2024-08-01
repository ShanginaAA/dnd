export type QuestionType = {
  id: string;
  name: string;
  icon?: string;
};

export type Questions = {
  id?: string;
  name?: string;
  type: QuestionType;
  fk_page_id: number;
};

export type QuestionPosition = {
  start_index: number;
  end_index: number;
  fk_page_id: number;
};

export type QuestionPage = {
  source_page_id: number;
  destination_page_id: number;
  source_index: number;
  destination_index: number;
};
