import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-generic-button",
  templateUrl: "./generic-button.component.html",
  styleUrls: ["./generic-button.component.css"],
})
export class GenericButtonComponent {
  @Input() public displayText: string;

  updateDisplayText(input: HTMLTextAreaElement) {
    this.displayText = input.value;
  }
}
