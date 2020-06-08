import { Component, OnInit, NgModule, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";
import { Injectable } from "@angular/core";

@Component({
    selector: "app-et",
    templateUrl: "./et.component.html",
    styleUrls: ["./et.component.css"],
})
export class ETComponent {
    logged = "true";
    constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

    radio1 = "radio1";
    radio2 = "radio2";


    formData: any[] = [];

    getobject(array) {
        var object_name = {
            p1: array[0],
            p2: array[1],
        };
        return object_name;
    }

    sendData() {
        var formdata2 = this.getobject(this.formData)
        this.formService.storeData(formdata2, "ET");
    }
}