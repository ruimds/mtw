import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  ngOnInit() {
    if (sessionStorage.getItem("token") !== null) {
      sessionStorage.removeItem("token");
    }
  }
}
