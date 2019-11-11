import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calculationForm: FormGroup;
  showHistory = false;
  calculationOperator = '';

  constructor() {
    this.calculationForm = new FormGroup({
      calculationInput: new FormControl('')
    });
  }

  getKey(key: string) {
    this.calculationOperator += key;
    this.calculationForm.patchValue({ calculationInput: this.calculationOperator });
  }

  onSubmit() {
    console.log(this.calculationForm.value);
  }

  /*onKeypress(evt: KeyboardEvent) {
    // console.log(evt.which, evt.keyCode);
    const charCode = evt.which || evt.keyCode;
    console.log(charCode);

    const inputVal: string = this.calculationForm.value.clculationInput;
    console.log(inputVal);

    // const validateKeycode = [42, 45, 47, 43, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48];

    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];

    // }
  }*/
}
