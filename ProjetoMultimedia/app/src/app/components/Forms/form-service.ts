import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class FormService {
  private token: string;
  errorAuth;

  constructor(private http: HttpClient, private router: Router) { }


  storeData(formData, type: string) {
    console.log(formData);
    this.http
      .post("http://127.0.0.1:8080/api/paciente/questionario/" + type, formData)
      .subscribe((response) => {
        console.log("response login", response);
      });
    this.router.navigate(["/paciente"]);
  }
}