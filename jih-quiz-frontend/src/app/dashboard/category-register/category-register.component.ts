import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/dto/Category';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { ToastService } from '../../providers/toast.service';
import { DataParsingService } from '../../providers/data-parsing.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.scss']
})
export class CategoryRegisterComponent implements OnInit {

  firstFormGroup: FormGroup = <FormGroup>{};
  public category: Category = <Category>{};
  public esModificacion: boolean = false;

  isEditable = true;
  constructor(
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private _formBuilder: FormBuilder,
    private toastService: ToastService,
    private dataParsingService: DataParsingService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.iniciarValidaciones();
  }

  iniciarValidaciones() {
    this.firstFormGroup = this._formBuilder.group({
      vTitle: ["", Validators.required],
      vDescription: ["", Validators.required],

    });
  }
  get f(): any {
    return this.firstFormGroup.controls;
  }

  async registerCategory() {
    // /writers/category/create
    let respuesta = await this.apiQuiz.postGlobal<Category>(
      "/writers/category/create",
      this.category
    );
    if (respuesta.state) {
      this.router.navigate(["/dashboard/category-list"]);
    } else {
      this.toastService.message("The category was not registered");
    }

  }
  back(): void {
    this.location.back();
  }

}
