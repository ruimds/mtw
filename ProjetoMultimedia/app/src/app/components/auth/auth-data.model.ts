export interface AuthLoginPsicologo {
  email: string;
  password: string;
}
export interface AuthLoginPaciente {
  email: string;
}
export interface AuthRegistarPsicologo {
  email: string;
  servico: string;
  genero: string;
  password: string;
}
export interface AuthRegistarPaciente {
  nome: string;
  idade: number;
  genero: string;
  email: string;
  emailpsicologo: string;
}
