import { Questions } from '../types/questions.type';

export const QUESTIONS: Questions[] = [
  {
    id: '1',
    name: 'Ваш первый вопрос 1',
    type: { id: '2', name: 'Короткий текст', icon: '' },
    position: 1,
    fk_page_id: 1,
  },
  {
    id: '2',
    name: 'Ваш первый вопрос 2',
    type: {
      id: '4',
      name: 'Один вариант',
      icon: '/elements/circle-dot.png',
    },
    position: 2,
    fk_page_id: 1,
  },
  {
    id: '3',
    name: 'Ваш первый вопрос 3',
    type: {
      id: '4',
      name: 'Один вариант',
      icon: '/elements/circle-dot.png',
    },
    position: 3,
    fk_page_id: 1,
  },
  {
    id: '4',
    name: 'Ваш первый вопрос 4',
    type: { id: '2', name: 'Короткий текст', icon: '' },
    position: 1,
    fk_page_id: 2,
  },
  {
    id: '5',
    name: 'Ваш первый вопрос 5',
    type: {
      id: '4',
      name: 'Один вариант',
      icon: '/elements/circle-dot.png',
    },
    position: 2,
    fk_page_id: 2,
  },
];
