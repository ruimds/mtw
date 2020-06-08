import { Component, OnInit, NgModule, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormService } from "../form-service";

@Component({
    selector: "app-oq10",
    templateUrl: "./oq10.component.html",
    styleUrls: ["./oq10.component.css"],
})
export class OQ10Component {
    logged = "true";

    constructor(private http: HttpClient, private router: Router, private formService: FormService) { }

    formData: any[] = [];

    getobject(array) {
        var object_name = {
            p1: array[0],
            p2: array[1],
            p3: array[2],
            p4: array[3],
            p5: array[4],
            p6: array[5],
            p7: array[6],
            p8: array[7],
            p9: array[8],
            p10: array[9],
        };
        return object_name;
    }

    sendData() {
        var formdata2 = this.getobject(this.formData)
        this.formService.storeData(formdata2, "OQ-10");
    }
}