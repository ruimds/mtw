import { Component, OnInit, NgModule, Input } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Input() public url: string;
  @Input() public homeurl: string;
  @Input() public mostrarRegistar: boolean;
  @Input() public logged: boolean;

  setUrl(url) {
    this.url = url;
  }
}
