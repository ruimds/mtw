import { Component, OnInit, NgModule, Input } from "@angular/core";
import { AuthService } from "../../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-psicologo",
  templateUrl: "./login-psicologo.component.html",
  styleUrls: ["./login-psicologo.component.css"],
})
export class LoginPsicologoComponent {
  url = "registoPsicologo";
  mostrarRegistar = true;
  logged = false;
  homeurl = "/";

  constructor(public authService: AuthService) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginPsicologo(form.value.email, form.value.password);
  }
}
