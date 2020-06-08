import { Component, OnInit, NgModule, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";

@Component({
    selector: "app-qap",
    templateUrl: "./qap.component.html",
    styleUrls: ["./qap.component.css"],
})
export class QAPComponent {
    logged = "true";

    constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

    formData: any[] = [];

    getobject(array) {
        var object_name = {
            p0: array[0],
            p1: array[1],
            p2: array[2],
            p3: array[3],
            p4: array[4],
            p5: array[5],
            p6: array[6],
            p7: array[7],
            p8: array[8],
            p9: array[9],
        };
        return object_name;
    }

    sendData() {
        var formdata2 = this.getobject(this.formData)
        this.formService.storeData(formdata2, "QAP");
    }
}