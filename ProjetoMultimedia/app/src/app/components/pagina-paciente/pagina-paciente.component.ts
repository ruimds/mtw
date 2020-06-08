import { Component, OnInit, NgModule, Input, ViewChild } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


export interface paciente {
  genero: string;
  emailpsicologo: number;
  idade: number;
  email: string;
  nome: string;
}


export interface questionario {
  email: string;
  perguntas: any[];
}
let DATA: questionario[] = [];
let ELEMENT_DATA: paciente[] = [];

@Component({
  selector: "app-paginapaciente",
  templateUrl: "./pagina-paciente.component.html",
  styleUrls: ["./pagina-paciente.component.css"],
})
export class PaginaPacienteComponent {
  logged = "true";
  homeurl = "/psicologo";

  ngOnInit() {
    this.paciente();
  }

  displayedColumns: string[] = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'];
  dataSource = ELEMENT_DATA;
  respostas = DATA;
  emailPaciente = sessionStorage.getItem('paciente');
  constructor(private http: HttpClient, private router: Router) { }

  paciente() {
    this.http
      .get("http://127.0.0.1:8080/api/pacientes/show/" + this.emailPaciente)
      .subscribe((response) => {
        this.dataSource = response;
      });
  }

  getRespostas(value: any) {
    this.http
      .get("http://127.0.0.1:8080/api/pacientes/questionarios/" + this.emailPaciente + "/" + value)
      .subscribe((response) => {
        this.respostas = response;
      });
  }
}