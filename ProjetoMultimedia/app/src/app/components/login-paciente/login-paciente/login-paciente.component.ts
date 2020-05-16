import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-login-paciente",
  templateUrl: "./login-pacientecomponent.html",
  styleUrls: ["./login-paciente.component.css"],
})
export class LoginPacienteComponent {
  title = "Avaliação de Sessão";
  showPassword = false;
}
