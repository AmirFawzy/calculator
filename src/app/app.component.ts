import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

interface Operation {
  firstOpt: string;
  watingForSecondOperand?: boolean;
  operator: string;
}

interface CalculationData extends Operation {
  secondOpt: string;
  result: number;
}

export interface CalculatorHistory {
  date: Date;
  calculationData: CalculationData;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calculationForm: FormGroup;
  showHistory = false;
  result: number;
  mathematicalOperation: string;
  private calculator: Operation = {
    firstOpt: null,
    watingForSecondOperand: false,
    operator: null
  };

  constructor() {
    // const rgex = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/;
    this.calculationForm = new FormGroup({
      calculationInput: new FormControl('')
    });

    // Set calculator history if not exist
    if (!localStorage.calculatorHistory) {
      localStorage.calculatorHistory = JSON.stringify([]);
    }
  }

  /**
   * Get the pressed key
   *
   * @param {string} key digit, operator or AC
   * @memberof AppComponent
   *
   * @constant {string[]} operators math operators
   *
   * Set `mathematicalOperation` to [null]
   *
   * If the key was `0` and the calculator input was empty, skip inputting in value to the input
   *
   * If the key was math operator excute `handleOperator()`
   *
   * If the key not 0 nor operator and `this.calculator.watingForSecondOperand` was truthy,
   * set `watingForSecondOperand` to [false] and input the key (digit) to the calculator input,
   * if `this.calculator.watingForSecondOperand` was falsy add the key (digit) to the input value
   */
  getKey(key: string) {
    const operators = ['+', '-', '*', '/', '='];
    this.mathematicalOperation = null;

    if ((key === '0') && !this.control.value.length) {

      this.inputVal = '';

    } else if (operators.includes(key)) {

      this.handleOperator(key);

    } else {

      if (this.calculator.watingForSecondOperand) {

        this.calculator.watingForSecondOperand = false;
        this.inputVal = key;

      } else {

        this.inputVal = this.control.value + key;

      }

    }
  }

  onSubmit() {
    return;
  }

  /**
   * Clear the calculator input and reset the result output
   *
   * @memberof AppComponent
   */
  onClear() {
    this.calculationForm.reset();
    this.result = null;
  }

  /**
   * Handle the operator
   *
   * @private
   * @param {string} operator +, -, *, /
   * @memberof AppComponent
   *
   * If first operand in `this.calculator` was falsy,
   * set the first operand to input value
   *
   * If the operator in `this.calculator` was truthy,
   * @constant {number} resultOutput is the calculation output result
   *
   * Handling the calculator history by local storage,
   * @constant {CalculatorHistory[]} calculatorHistoryStorage the calculator history array,
   * add new mathematical operation data to the calculator history,
   * input the `resultOutput` to the calculator input value, set first operand in `this.calculator`
   *
   * Set `this.calcultor.watingForSecondOperand` to [true] and set the operator in `this.calculator`
   */
  private handleOperator(operator: string) {
    if (this.calculator.firstOpt === null) {

      this.calculator.firstOpt = this.control.value;

    } else if (this.calculator.operator) {

      const resultOutput = this.handleCalculation(this.calculator.operator, +this.calculator.firstOpt, +this.control.value);

      // Handle Storage (calculator history)
      if (this.calculator.operator !== '=') {

        const calculatorHistoryStorage: CalculatorHistory[] = JSON.parse(localStorage.calculatorHistory);

        calculatorHistoryStorage.push({
          date: new Date(),
          calculationData: {
            firstOpt: this.calculator.firstOpt,
            secondOpt: this.control.value,
            operator: this.calculator.operator,
            result: this.handleCalculation(this.calculator.operator, +this.calculator.firstOpt, +this.control.value)
          }
        });

        localStorage.calculatorHistory = JSON.stringify(calculatorHistoryStorage);

      }

      if (operator === '=') {
        this.mathematicalOperation = `${this.calculator.firstOpt} ${this.calculator.operator} ${this.control.value}`;
      }

      this.inputVal = '' + resultOutput;
      this.calculator.firstOpt = String(resultOutput);

    }

    this.calculator.watingForSecondOperand = true;
    this.calculator.operator = operator;

  }

  /**
   * Handle the calculation and out put the result
   *
   * @private
   * @param {string} operator +, *, /, -
   * @param {number} firstOperand first digit in the calculation
   * @param {number} secondOperand second digit in the calculation
   * @returns {number}
   * @memberof AppComponent
   */
  private handleCalculation(operator: string, firstOperand: number, secondOperand: number): number {
    const performCalculation = {
      '+': () => firstOperand + secondOperand,
      '-': () => firstOperand - secondOperand,
      '*': () => firstOperand * secondOperand,
      '/': () => firstOperand / secondOperand,
      '=': () => secondOperand
    };

    return performCalculation[operator]();
  }

  /**
   * Get calculator input control for accessing the controler object brovided by angular
   *
   * @readonly
   * @private
   * @type {AbstractControl}
   * @memberof AppComponent
   */
  private get control(): AbstractControl {
    return this.calculationForm.get('calculationInput');
  }

  /**
   * Get calculator input error
   *
   * @readonly
   * @type {boolean}
   * @memberof AppComponent
   */
  get hasError(): boolean {
    return this.control.hasError('pattern');
  }

  /**
   * Get calculator input value
   *
   * @private
   * @memberof AppComponent
   * @param {string} digit the key name
   */
  private set inputVal(digit: string) {
    this.calculationForm.patchValue({ calculationInput: digit });
  }
}
