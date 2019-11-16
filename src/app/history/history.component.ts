import { Component, OnInit } from '@angular/core';

import { CalculatorHistory } from '../app.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: CalculatorHistory[];

  constructor() { }

  ngOnInit() {
    const calculatorHistory: CalculatorHistory[] = JSON.parse(localStorage.calculatorHistory);
    calculatorHistory.sort(this.sortCalculatorHistory);
    this.history = calculatorHistory;
  }

  private sortCalculatorHistory<T extends { date: Date }>(a: T, b: T) {
    if (a.date > b.date) { return -1; }
    if (a.date < b.date) { return 1; }
    return;
  }
}
