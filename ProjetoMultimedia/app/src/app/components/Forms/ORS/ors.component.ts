import { Component, OnInit, NgModule, Input } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";

@Component({
  selector: "app-ors",
  templateUrl: "./ors.component.html",
  styleUrls: ["./ors.component.css"],
})

export class orsComponent {
  logged = "true";

  constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

  formData: any[] = [
    {
      p1   : 0,
      p2   : 0,
      p3   : 0,
      p4   : 0,
    }
  ];

  sendData()
  {
    this.formService.storeData(this.formData, "ORS");
  }
}