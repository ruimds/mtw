import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-home-paciente",
  templateUrl: "./home-paciente.component.html",
  styleUrls: ["./home-paciente.component.css"],
})
export class HomePacienteComponent {
  logged = "true";
  homeurl = "/paciente";
}
