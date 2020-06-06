import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { LoginPacienteComponent } from "./components/auth/login-paciente/login-paciente/login-paciente.component";
import { LoginPsicologoComponent } from "./components/auth/login-psicologo/login-psicologo/login-psicologo.component";
import { HomeComponent } from "./components/Home/home.component";
import { HomePacienteComponent } from "./components/Home-Paciente/home-paciente.component";
import { HomePsicologoComponent } from "./components/Home-Psicologo/home-psicologo.component";
import { orsComponent } from "./components/ORS/ors.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "paciente", component: HomePacienteComponent },
  { path: "psicologo", component: HomePsicologoComponent },
  { path: "loginPaciente", component: LoginPacienteComponent },
  { path: "loginPsicologo", component: LoginPsicologoComponent },
  { path: "registoPaciente", component: LoginPsicologoComponent },
  { path: "registoPsicologo", component: LoginPsicologoComponent },
  { path: "ors", component: orsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
