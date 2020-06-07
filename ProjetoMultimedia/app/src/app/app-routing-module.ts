import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { LoginPacienteComponent } from "./components/auth/login-paciente/login-paciente/login-paciente.component";
import { LoginPsicologoComponent } from "./components/auth/login-psicologo/login-psicologo/login-psicologo.component";
import { RegistoPacienteComponent } from "./components/auth/Registo-Paciente/registo-paciente.component";
import { RegistoPsicologoComponent } from "./components/auth/Registo-Psicologo/registo-psicologo.component";
import { HomeComponent } from "./components/Home/home.component";
import { HomePacienteComponent } from "./components/Home-Paciente/home-paciente.component";
import { HomePsicologoComponent } from "./components/Home-Psicologo/home-psicologo.component";
import { orsComponent } from "./components/Forms/ORS/ors.component";
import { srsComponent } from "./components/Forms/SRS/srs-component";
import { ETComponent } from "./components/Forms/ET/et.component";
import { OQ10Component } from "./components/Forms/OQ-10/oq10.component";
import { QAPComponent } from "./components/Forms/QAP/qap.component";
import { STComponent } from "./components/Forms/ST/st.component";
import { WAIComponent } from "./components/Forms/WAI/wai.component";
import { 
  AuthGuardService as AuthGuard 
} from './components/auth/auth-guard.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "paciente", component: HomePacienteComponent },
  { path: "psicologo", component: HomePsicologoComponent },
  { path: "loginPaciente", component: LoginPacienteComponent },
  { path: "loginPsicologo", component: LoginPsicologoComponent },
  { path: "srs", component: srsComponent, canActivate: [AuthGuard] },
  { path: "et", component: ETComponent, canActivate: [AuthGuard] },
  { path: "oq10", component: OQ10Component, canActivate: [AuthGuard] },
  { path: "qap", component: QAPComponent, canActivate: [AuthGuard] },
  { path: "st", component: STComponent, canActivate: [AuthGuard] },
  { path: "wai", component: WAIComponent, canActivate: [AuthGuard] },
  { path: "ors", component: orsComponent, canActivate: [AuthGuard]},
  { path: "registoPaciente", component: RegistoPacienteComponent },
  { path: "registoPsicologo", component: RegistoPsicologoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
