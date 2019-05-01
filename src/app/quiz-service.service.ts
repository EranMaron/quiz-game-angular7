import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Quiz } from './models/quiz'

@Injectable({
  providedIn: 'root'
})

export class QuizServiceService {
  quiz: Quiz[];
  question: string;
  correctAnswer: string;
  incorrectAnswers: [];
  allAnswers: string[];
  questionNumber: number = 0;
  randomIndex: number;
  disableBtn: boolean = true;
  btnValue: string = "OK";
  choosenAnswer: number;
  answerindicate: number[] = [0, 0, 0, 0];
  imgIndicate: string;
  url: string = 'https://opentdb.com/api.php?amount=10&type=multiple'

  constructor(private http: HttpClient) { }
  getQuiz(): Observable<Quiz[]> {
    return this.http.get<any>(this.url).pipe(map(res => {
      this.quiz = res.results;
      this.question = this.quiz[this.questionNumber].question;
      this.correctAnswer = this.quiz[this.questionNumber].correct_answer;
      this.incorrectAnswers = this.quiz[this.questionNumber].incorrect_answers;
      this.randomIndex = this.randomIndex = Math.floor(Math.random() * Math.floor(4));
      this.mixAnswers();
      this.questionNumber++;
      return res.results as Quiz[]
    }));
  }

  mixAnswers() {
    this.allAnswers = this.incorrectAnswers;
    this.allAnswers.splice(this.randomIndex, 0, this.correctAnswer);
  }

  onAnswerChoosen(i: number, correctAnsIndex: number) {
    this.choosenAnswer = i;
    this.disableBtn = false;
  }

  checkAnswer() {
    if (this.choosenAnswer === this.randomIndex) {
      this.answerindicate[this.choosenAnswer] = 1;
      this.imgIndicate = "rightAns";
      this.btnValue = "Continue";
    } else {
      this.answerindicate[this.choosenAnswer] = 2;
      this.imgIndicate = "wrongAns";
      this.btnValue = "Continue";
    }
  }
}
