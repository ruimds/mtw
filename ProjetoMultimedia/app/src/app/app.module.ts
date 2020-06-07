import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


/**
 * Components
 */
import { AppComponent } from "./app.component";
import { LoginPacienteComponent } from "./components/auth/login-paciente/login-paciente/login-paciente.component";
import { LoginPsicologoComponent } from "./components/auth/login-psicologo/login-psicologo/login-psicologo.component";
import { RegistoPacienteComponent } from "./components/auth/Registo-Paciente/registo-paciente.component";
import { RegistoPsicologoComponent } from "./components/auth/Registo-Psicologo/registo-psicologo.component";
import { HomeComponent } from "./components/Home/home.component";
import { HomePsicologoComponent } from "./components/Home-Psicologo/home-psicologo.component";
import { HomePacienteComponent } from "./components/Home-Paciente/home-paciente.component";
import { orsComponent } from "./components/ORS/ors.component";
import { srsComponent } from "./components/srs/srs-component";

 /**
  * Modules
  */
import {MatSliderModule} from '@angular/material/slider';
import { HeaderComponent } from "./components/Header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppRoutingModule } from "./app-routing-module";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    LoginPacienteComponent,
    LoginPsicologoComponent,
    HomeComponent,
    HeaderComponent,
    HomePsicologoComponent,
    HomePacienteComponent,
    RegistoPacienteComponent,
    RegistoPsicologoComponent,
    orsComponent,
    srsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
