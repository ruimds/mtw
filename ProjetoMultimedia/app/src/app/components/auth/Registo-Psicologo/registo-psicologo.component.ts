import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-registo-psicologo",
  templateUrl: "./registo-psicologo.component.html",
  styleUrls: ["./registo-psicologo.component.css"],
})
export class RegistoPsicologoComponent {
  mostrarRegistar = false;
  logged = false;
  homeurl = "/";
}
