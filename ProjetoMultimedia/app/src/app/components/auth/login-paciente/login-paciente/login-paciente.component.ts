import { Component, OnInit, NgModule, Input } from "@angular/core";

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
}
