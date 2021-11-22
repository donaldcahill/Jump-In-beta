import { Component, OnInit } from '@angular/core';
import { Category } from '../../dto/Category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Writer } from '../../dto/Writer';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { ToastService } from '../../providers/toast.service';
import { History } from '../../dto/History';
import { DataParsingService } from '../../providers/data-parsing.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history-register',
  templateUrl: './history-register.component.html',
  styleUrls: ['./history-register.component.scss']
})
export class HistoryRegisterComponent implements OnInit {

  public lstCategories: Category[] = [];
  firstFormGroup: FormGroup = <FormGroup>{};
  public writer: Writer = <Writer>{};
  public history: History = <History>{};
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
  async listCategories() {
    this.lstCategories = await this.apiQuiz.getGlobal<Category[]>(
      "/writers/category/list"
    );
    if (!(this.lstCategories.length > 0)) {
      this.toastService.message("No categories registered, please first register a category.");
      this.router.navigate(["/dashboard/categorie-list"]);
    }
  }
  ngOnInit(): void {
    this.writer = Object.assign(this.storageService.getStorage());

    if (this.dataParsingService.get()) {
      this.history = this.dataParsingService.get();
      this.esModificacion = true;
    } else {
      this.esModificacion = false;
    }
    this.listCategories();
    this.iniciarValidaciones();
  }

  iniciarValidaciones() {
    this.firstFormGroup = this._formBuilder.group({
      vTitle: ["", Validators.required],
      vCategorie: ["", Validators.required],
      vContent: ["", Validators.required],
    });
  }
  get f(): any {
    return this.firstFormGroup.controls;
  }
  async registerHistory() {
    // /writers/history/create
    this.history.state = true;
    this.history.idWriter = this.writer.idWriter;
    console.log(this.history);
    let respuesta = await this.apiQuiz.postGlobal<History>(
      "/writers/history/create",
      this.history
    );
    if (respuesta) {
      this.router.navigate(["/dashboard/history-list"]);
    } else {
      this.toastService.message("The history was not registered");
    }
  }
  back(): void {
    this.location.back();
  }

}
