import { Component, OnInit, NgModule, Input } from "@angular/core";
import { FormItemComponent } from "../../form-item/form-item/form-item.component";
import { Form } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  @Input() public title: string;
  @Input() public showPassword: boolean;
  buttonText = "Login";
  iconEmail = "email";
  placeholderEmail = "Email";
  iconPassword = "vpn_key";
  placeholderPassword = "Password";

  updateTitle(input: HTMLTextAreaElement) {
    this.title = input.value;
  }
  showPasswordInput(show) {
    this.showPassword = show;
  }
}
