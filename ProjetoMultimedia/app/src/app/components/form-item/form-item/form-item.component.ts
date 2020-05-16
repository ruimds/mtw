import { Component, OnInit, NgModule } from "@angular/core";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: "app-form-item",
  templateUrl: "./form-item.component.html",
  styleUrls: ["./form-item.component.css"],
})
export class FormItemComponent {
  icon = "person";
  placeholder = "Primeiro e último nome";

  updateIcon(input: HTMLTextAreaElement) {
    this.icon = input.value;
  }
  updatePlaceholder(input: Placeholder) {
    this.placeholder = input.value;
  }
}
