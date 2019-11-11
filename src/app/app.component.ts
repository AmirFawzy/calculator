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

  constructor() {
    this.calculationForm = new FormGroup({
      clculationInput: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.calculationForm.value);
  }
}
