import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { QuizServiceService } from 'src/app/quiz-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
  
export class QuestionComponent implements OnInit {
  @Input() currQuestion: string;
  @Input() answers: string[];
  @Input() correctAnsIndex: number;

  constructor(private quizService:QuizServiceService) { }

  ngOnInit() {
  }
}
