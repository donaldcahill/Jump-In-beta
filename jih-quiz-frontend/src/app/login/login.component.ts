import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/login.dto';
import { QuizApiService } from '../providers/quiz-api.service';
import { DatosUsuarioService } from '../providers/datos-usuario.service';
import { LoginResponseDto } from '../dto/login-response.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup = <FormGroup>{};
  public login: LoginDto = <LoginDto>{};
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService
  ) { }
  ngOnInit(): void {
    this.iniciarValidaciones();
  }
  iniciarValidaciones() {
    this.myForm = this.fb.group({
      vLogin: ["", [Validators.required]],
      vPass: ["", [Validators.required]],
    });
  }
  get f(): any {
    return this.myForm.controls;
  }

  async irInicio() {
    let login: LoginDto = {
      email: this.login.email.toLowerCase(),
      password: this.login.password,
    };
    console.log(login);
    const respuesta: LoginResponseDto =
      await this.apiQuiz.postGlobal<LoginResponseDto>(
        "/writers/writer/login",
        login
      );
    console.log(respuesta);

    if (respuesta && respuesta.state) {
      this.storageService.setStorage(respuesta.user);
      this.router.navigateByUrl("/dashboard/history-list");
    } else {
      window.alert("Usuario o contraseña incorrectos");
    }
  }
  irRegistro() {
    this.router.navigateByUrl("writer-register");
  }
}
