import { Component, OnInit, NgModule, Input } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-registo-psicologo",
  templateUrl: "./registo-psicologo.component.html",
  styleUrls: ["./registo-psicologo.component.css"],
})
export class RegistoPsicologoComponent {
  mostrarRegistar = false;
  logged = false;
  homeurl = "/";

  constructor(public authService: AuthService) { }

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.registarPsicologo(form.value.email, form.value.nome, form.value.servico, form.value.password);
  }
}
