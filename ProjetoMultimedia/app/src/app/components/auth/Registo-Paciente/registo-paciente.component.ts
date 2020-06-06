import { Component, OnInit, NgModule, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-registo-paciente",
  templateUrl: "./registo-paciente.component.html",
  styleUrls: ["./registo-paciente.component.css"],
})
export class RegistoPacienteComponent {
  mostrarRegistar = false;
  logged = false;
  homeurl = "/";

  constructor(public authService: AuthService) { }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.registarPaciente(form.value.nome, form.value.idade, form.value.genero, form.value.email, form.value.emailpsicologo);
  }
}
