import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calculationForm: FormGroup;
  showHistory = false;
  calculationOperator = '';
  isControlValid = false;

  constructor() {
    const rgex = /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/;
    this.calculationForm = new FormGroup({
      calculationInput: new FormControl('', Validators.pattern(rgex))
    });

    this.control.valueChanges.subscribe(() => {
      const isInputHasVal = (this.control.value as string).length ? true : false;
      console.log(isInputHasVal);
      this.isControlValid = !this.hasError && isInputHasVal;
    });
  }

  getKey(key: string) {
    if (key !== '=') {
      this.calculationOperator += key;
      this.calculationForm.patchValue({ calculationInput: this.calculationOperator });
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    console.log(this.calculationForm.value);
  }

  onClear() {
    this.calculationForm.reset();
    this.calculationOperator = '';
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


  get control(): AbstractControl {
    return this.calculationForm.get('calculationInput');
  }


  get hasError(): boolean {
    return this.control.hasError('pattern');
  }

}
