import { Component, OnInit, NgModule, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";

@Component({
    selector: "app-st",
    templateUrl: "./st.component.html",
    styleUrls: ["./st.component.css"],
})
export class STComponent {
    logged = "true";

    constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

    formData: any[] = [];

    getobject(array) {
        var object_name = {
            p1: array[0],
        };
        return object_name;
    }

    sendData() {
        var formdata2 = this.getobject(this.formData)
        this.formService.storeData(formdata2, "ST");
    }
}