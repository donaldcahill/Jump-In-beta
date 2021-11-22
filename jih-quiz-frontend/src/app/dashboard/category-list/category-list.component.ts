import { Category } from './../../dto/Category';
import { Writer } from './../../dto/Writer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { DataParsingService } from '../../providers/data-parsing.service';
import { QuizService } from '../../providers/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public writer: Writer = <Writer>{};
  public lstCategory: Category[] = [];


  constructor(
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private dataParsingService: DataParsingService,
    private quizService: QuizService,
    private location: Location
  ) { }

  ngOnInit(): void {
    /*if (!this.dataParsingService.get()) {
      this.router.navigate(["/dashboard/history-list"]);
    }*/

    this.writer = Object.assign(this.storageService.getStorage());

    this.getCategory();
  }

  async getCategory() {
    this.lstCategory = await this.apiQuiz.getGlobal<Category[]>(
      "/writers/category/list"
    );
    console.log(this.lstCategory)
  }
  async categoryRegister() {
    this.router.navigate(["/dashboard/category-register"]);
  }
  editCategory(category: Category) {
  }
  deleteCategory(category: Category) {

  }

  back(): void {
    this.location.back();
  }

}
