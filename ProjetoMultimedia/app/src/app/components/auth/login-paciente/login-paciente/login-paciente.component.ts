import { Component, OnInit, NgModule, Input } from "@angular/core";
import { AuthService } from "../../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-paciente",
  templateUrl: "./login-pacientecomponent.html",
  styleUrls: ["./login-paciente.component.css"],
})
export class LoginPacienteComponent {
  url = "registoPaciente";
  mostrarRegistar = true;
  logged = false;
  homeurl = "/";

  constructor(public authService: AuthService) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginPaciente(form.value.email);
  }

  ngOnInit() {
    if (sessionStorage.getItem("token") !== null) {
      sessionStorage.removeItem("token");
    }
  }
}
