import { Component, OnInit, NgModule, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";

@Component({
  selector: "app-srs",
  templateUrl: "./srs-component.html",
  styleUrls: ["./srs-component.css"],
})
export class srsComponent {
  logged = true;
  paciente = true;

  constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

  formData: any[] = [];

  getobject(array) {
    var object_name = {
      p1: array[0],
      p2: array[1],
      p3: array[2],
      p4: array[3],
    };
    return object_name;
  }

  sendData() {
    var formdata2 = this.getobject(this.formData)
    this.formService.storeData(formdata2, "SRS");
  }
}