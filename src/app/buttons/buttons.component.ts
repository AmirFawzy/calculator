import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Output() keyName =  new EventEmitter<string>();
  @Input() isInputValid: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.isInputValid);
  }

  onKeyClick(evt: MouseEvent) {
    const keyData = (evt.target as HTMLElement).dataset.key;
    this.keyName.emit(keyData);
  }
}
