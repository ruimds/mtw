import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatRadioModule } from '@angular/material/radio';


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
import { orsComponent } from "./components/Forms/ORS/ors.component";
import { srsComponent } from "./components/Forms/SRS/srs-component";
import { ETComponent } from "./components/Forms/ET/et.component";
import { OQ10Component } from "./components/Forms/OQ-10/oq10.component";
import { QAPComponent } from "./components/Forms/QAP/qap.component";
import { STComponent } from "./components/Forms/ST/st.component";
import { WAIComponent } from "./components/Forms/WAI/wai.component";
import { PaginaPacienteComponent } from "./components/pagina-paciente/pagina-paciente.component"

/**
 * Modules
 */
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from "./components/Header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppRoutingModule } from "./app-routing-module";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AuthInterceptor } from "./components/auth/auth-interceptor";
import {AuthGuardService} from './components/auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

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
    srsComponent,
    ETComponent,
    OQ10Component,
    QAPComponent,
    STComponent,
    WAIComponent,
    PaginaPacienteComponent,
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
    HttpClientModule,
    MatRadioModule,
    JwtModule,
    MatTableModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
