import { QuestionType } from '../types/questions.type';

export const TYPE: QuestionType[] = [
  { id: '1', name: 'Длинный текст (многострочный)', icon: '' },
  { id: '2', name: 'Короткий текст', icon: '' },
  {
    id: '3',
    name: 'Надпись',
    icon: '',
  },
  {
    id: '4',
    name: 'Один вариант',
    icon: '/elements/circle-dot.png',
  },
  { id: '5', name: 'Несколько вариантов', icon: '/elements/square-check.png' },
  { id: '6', name: 'Выпадающий список', icon: '' },
  { id: '7', name: 'Да / Нет', icon: '' },
  { id: '8', name: 'Число', icon: '/elements/number.png' },
  { id: '9', name: 'Оценки по шкале', icon: '' },
  { id: '10', name: 'Дата', icon: '' },
];
