import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.css']
})
export class GenericButtonComponent {

  displayText = '';

  updateDisplayText(input: HTMLTextAreaElement)
  {
    this.displayText = input.value;
  }
}
