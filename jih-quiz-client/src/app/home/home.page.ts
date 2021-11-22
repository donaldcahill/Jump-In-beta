import { Component, OnInit } from '@angular/core';
import { QuizService } from '../providers/quiz.service';
import { StorageQuizService } from '../providers/storage-quiz.service';
import { User } from '../../dto/User';
import { Points } from '../../dto/Points';
import { Router } from '@angular/router';
import { Category } from '../../dto/Category';
import { HistoryDataService } from '../providers/history-data.service';
import { History } from '../../dto/History';
import { UserDataService } from '../providers/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: User = {} as User;
  puntosTotales = 0;
  rankingTotal = 0;
  public lstCategory: Category[] = [];
  constructor(
    private quizService: QuizService,
    private storageService: StorageQuizService,
    public router: Router,
    public historyService: HistoryDataService,
    public userService: UserDataService
  ) { }

  ngOnInit() {
    this.validateUser();
  }
  async validateUser() {
    const respuesta: any = await this.storageService.getObject('user');
    if (respuesta) {
      this.user = respuesta;
      this.userService.set(this.user);
      console.log(this.user);
      this.cargarPuntos();
    } else {
      const dummy = {};
      this.user = await this.quizService.postGlobal<User>(
        '/quiz/generate-random',
        dummy
      );
      if (this.user) {
        await this.storageService.setObject('user', this.user);
        this.userService.set(this.user);
        this.cargarPuntos();
      }
      //this.router.navigateByUrl('/login');
    }
    this.obtenerCategorias();
  }
  async cargarPuntos() {
    this.puntosTotales = await this.quizService.getGlobal<number>(
      '/quiz/get-poinst-by-user/' + this.user.idUser
    );
    this.rankingTotal = await this.quizService.getGlobal<number>(
      '/quiz/get-result-by-user/' + this.user.idUser
    );
  }
  async obtenerCategorias() {
    this.lstCategory = await this.quizService.getGlobal<Category[]>(
      '/quiz/list-category'
    );
    console.log(this.lstCategory);
  }
  async irHistory(item: Category) {
    console.log(item);
    const history: History = await this.quizService.getGlobal<History>(
      '/quiz/get-history-by-category/' + item.idCategory
    );
    this.historyService.set(history);
    this.router.navigateByUrl('/history');
  }
  async irPerfil() {
    console.log('perfil');
  }
}
