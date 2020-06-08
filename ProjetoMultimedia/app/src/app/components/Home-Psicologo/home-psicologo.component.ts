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

let ELEMENT_DATA: paciente[] = [];

@Component({
  selector: "app-home-psicologo",
  templateUrl: "./home-psicologo.component.html",
  styleUrls: ["./home-psicologo.component.css"],
})
export class HomePsicologoComponent {

  ngOnInit() {
    this.clients();
  }

  constructor(private http: HttpClient, private router: Router) { }
  logged = "true";
  homeurl = "/psicologo";
  displayedColumns: string[] = ['genero', 'emailpsicologo', 'idade', 'email', 'nome'];
  dataSource = ELEMENT_DATA;

  paciente(element: any) {
    sessionStorage.setItem('paciente', element.email);
    this.router.navigate(["/paginapaciente"]);
  }

  clients() {
    this.http
      .get("http://127.0.0.1:8080/api/pacientes/lista")
      .subscribe((response) => {
        this.dataSource = response;
      });
  }
}
