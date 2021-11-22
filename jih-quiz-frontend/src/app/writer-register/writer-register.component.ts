import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Writer } from '../dto/Writer';
import { Router } from '@angular/router';
import { QuizApiService } from '../providers/quiz-api.service';
import { DatosUsuarioService } from '../providers/datos-usuario.service';
import { ToastService } from '../providers/toast.service';
import { LoginResponseDto } from '../dto/login-response.dto';
import { MustMatch } from '../password.util';

@Component({
  selector: 'app-writer-register',
  templateUrl: './writer-register.component.html',
  styleUrls: ['./writer-register.component.scss']
})
export class WriterRegisterComponent implements OnInit {

  public myForm: FormGroup = <FormGroup>{};
  public writer: Writer = <Writer>{};
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.iniciarValidaciones();
  }
  iniciarValidaciones() {
    this.myForm = this.fb.group(
      {
        vFirstName: ["", [Validators.required]],
        vLastName: ["", [Validators.required]],
        vEmail: ["", [Validators.required]],
        vPass: ["", [Validators.required]],
        vConfirmPass: ["", [Validators.required]],
      },
      {
        validator: MustMatch("vPass", "vConfirmPass"),
      }
    );
  }
  get f(): any {
    return this.myForm.controls;
  }

  async register() {
    console.log("test");
    console.log(JSON.stringify(this.writer));
    this.writer.state = true;
    let respuesta = await this.apiQuiz.postGlobal<LoginResponseDto>(
      "/writers/writer/create",
      this.writer
    );
    if (respuesta.state) {
      this.storageService.setStorage(respuesta.user);
      this.router.navigate(["/dashboard/history-list"]);
    } else {
      this.toastService.message("Error al registrar al usuario");
    }
  }
}
