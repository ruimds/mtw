import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { GenericButtonComponent } from "./components/generic-button/generic-button/generic-button.component";
import { LoginComponent } from "./components/Login/Login/login.component";
import { LoginPacienteComponent } from "./components/login-paciente/login-paciente/login-paciente.component";
import { LoginPsicologoComponent } from "./components/login-psicologo/login-psicologo/login-psicologo.component";
import { FormItemComponent } from "./components/form-item/form-item/form-item.component";
import { FormItemPasswordComponent } from "./components/form-item-password/form-item-password/form-item-password.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    GenericButtonComponent,
    FormItemComponent,
    LoginComponent,
    LoginPacienteComponent,
    LoginPsicologoComponent,
    FormItemPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
