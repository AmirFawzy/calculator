import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  @Output() keyName =  new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onKeyClick(evt: MouseEvent) {
    const keyData = (evt.target as HTMLElement).dataset.key;
    this.keyName.emit(keyData);
  }
}
