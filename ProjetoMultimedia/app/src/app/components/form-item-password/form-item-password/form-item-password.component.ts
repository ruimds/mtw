import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Type, TypeScriptEmitter } from "@angular/compiler";
import { TypeModifier } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-form-item-password",
  templateUrl: "./form-item-password.component.html",
  styleUrls: ["./form-item-password.component.css"],
})
export class FormItemPasswordComponent {
  @Input() public icon: string;
  @Input() public placeholder: string;

  updateIcon(input: HTMLTextAreaElement) {
    this.icon = input.value;
  }
  updatePlaceholder(input: Placeholder) {
    this.placeholder = input.value;
  }
}
