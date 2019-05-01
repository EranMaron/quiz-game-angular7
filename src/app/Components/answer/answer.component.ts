import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { QuizServiceService } from 'src/app/quiz-service.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})

export class AnswerComponent implements OnInit {
  @Input() answers: string[];
  @Input() correctAnsIndex: number;

  constructor(private quizService: QuizServiceService) { }

  ngOnInit() {
  }
}
