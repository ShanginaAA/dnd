import React, { Component } from 'react';
import { Questions } from '../types/questions.type';

class QuestionsService {
  async updateQuestionPosition(id: string, data: Questions) {
    const response = '';
    return response;
  }
}

export const questionsService = new QuestionsService();
