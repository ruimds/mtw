import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthLoginPsicologo } from "./auth-data.model";
import { AuthLoginPaciente } from "./auth-data.model";
import { AuthRegistarPsicologo } from "./auth-data.model";
import { AuthRegistarPaciente } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  errorAuth;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }
  registarPsicologo(email: string, servico: string, genero: string, password: string) {
    const authData: AuthRegistarPsicologo = {
      email: email,
      servico: servico,
      genero: genero,
      password: password
    };
    this.http
      .post("http://localhost:3000/api/", authData)
      .subscribe((response) => {
        console.log("response login", response);
      });
    this.router.navigate(["/login"]);
  }
  registarPaciente(nome: string, idade: number, genero: string, email: string, emailpsicologo: string) {
    const authData: AuthRegistarPaciente = {
      nome: nome,
      idade: idade,
      genero: genero,
      email: email,
      emailpsicologo: emailpsicologo
    };
    this.http
      .post("http://localhost:3000/api/", authData)
      .subscribe((response) => {
        console.log("response login", response);
      });
    this.router.navigate(["/login"]);
  }
  loginPsicologo(email: string, password: string) {
    const authData: AuthLoginPsicologo = { email: email, password: password };
    this.http
      .post<{ token: string }>("http://127.0.0.1:8080/api/login/psicologos", authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
        },
        (error) => {
          console.log(error);
          return (this.errorAuth = error);
        }
      );
    this.router.navigate(["/psicologo"]);
  }
  loginPaciente(email: string) {
    const authData: AuthLoginPaciente = { email: email };
    this.http
      .post<{ token: string }>("http://127.0.0.1:8080/api/login/pacientes", authData)
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
        },
        (error) => {
          console.log(error);
          return (this.errorAuth = error);
        }
      );
    this.router.navigate(["/paciente"]);
  }
}
