import { Injectable } from "@angular/core";
import { Writer } from "../dto/Writer";

@Injectable({
  providedIn: "root",
})
export class DatosUsuarioService {
  private funcionario: Writer = <Writer>{};
  constructor() {}
  setLogin(funcionario: Writer) {
    this.funcionario = funcionario;
  }
  getLogin() {
    return this.funcionario;
  }

  setStorage(funcionario: Writer) {
    localStorage.setItem("writer", JSON.stringify(funcionario));
  }
  getStorage() {
    try {
      return localStorage.getItem("writer")?JSON.parse(localStorage.getItem('writer')||''):undefined;
    } catch (e) {
      return undefined;
    }
  }
}
