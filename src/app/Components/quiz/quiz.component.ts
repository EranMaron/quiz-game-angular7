import { Component, OnInit, Input } from '@angular/core';

import { Quiz } from 'src/app/models/quiz';
import { QuizServiceService } from 'src/app/quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
  
export class QuizComponent implements OnInit {
  quiz: Quiz[] = [];
  isConfirmed: boolean = false;

  constructor(private quizService: QuizServiceService) { }

  ngOnInit() {
    this.quizService.getQuiz().subscribe(quiz => {
      this.quiz = quiz;
    })
  }

  handleBtnClicked() {
    if (this.isConfirmed == false) {
      this.quizService.checkAnswer()
      this.isConfirmed = true;
    } else {
      this.goToNextQuestion();
      this.isConfirmed = false;
    }
  }

  goToNextQuestion() {
    if (this.quizService.questionNumber <= 9) {
      this.quizService.question = this.quiz[this.quizService.questionNumber].question;
      this.quizService.randomIndex = Math.floor(Math.random() * Math.floor(4));
      this.quizService.correctAnswer = this.quiz[this.quizService.questionNumber].correct_answer;
      this.quizService.incorrectAnswers = this.quiz[this.quizService.questionNumber].incorrect_answers;
      this.quizService.mixAnswers();
      this.quizService.questionNumber++;
      this.quizService.btnValue = "OK";
      this.quizService.disableBtn = true;
      this.quizService.answerindicate = [0, 0, 0, 0,];;
    }
  }
}
