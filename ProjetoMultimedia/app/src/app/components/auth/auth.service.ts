import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthLoginPsicologo } from "./auth-data.model";
import { AuthLoginPaciente } from "./auth-data.model";
import { AuthRegistarPsicologo } from "./auth-data.model";
import { AuthRegistarPaciente } from "./auth-data.model";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  errorAuth;

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) { }

  registarPsicologo(email: string, nome: string, servico: string, password: string) {
    const authData: AuthRegistarPsicologo = {
      email: email,
      nome: nome,
      servico: servico,
      password: password
    };
    this.http
      .post("http://127.0.0.1:8080/api/psicologos", authData)
      .subscribe((response) => {
        console.log("response login", response);
      });
    this.router.navigate(["/loginPsicologo"]);
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
      .post("http://127.0.0.1:8080/api/pacientes", authData)
      .subscribe((response) => {
        console.log("response login", response);
      });
    this.router.navigate(["/loginPaciente"]);
  }

  loginPsicologo(email: string, password: string) {
    const authData: AuthLoginPsicologo = { email: email, password: password };
    this.http
      .post<{ token: string }>("http://127.0.0.1:8080/api/login/psicologos", authData)
      .subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token);
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
          sessionStorage.setItem('token', response.token);
        },
        (error) => {
          console.log(error);
          return (this.errorAuth = error);
        }
      );
    this.router.navigate(["/paciente"]);
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    console.log(token);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
