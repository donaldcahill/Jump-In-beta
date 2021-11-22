import { Component, OnInit } from '@angular/core';
import { Writer } from '../../dto/Writer';
import { History } from '../../dto/History';
import { Router } from '@angular/router';
import { QuizApiService } from '../../providers/quiz-api.service';
import { DatosUsuarioService } from '../../providers/datos-usuario.service';
import { DataParsingService } from 'src/app/providers/data-parsing.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  public writer: Writer = <Writer>{};
  public lstHistories: History[] = [];

  constructor(
    private router: Router,
    private apiQuiz: QuizApiService,
    private storageService: DatosUsuarioService,
    private dataService: DataParsingService,
  ) { }

  ngOnInit(): void {
    this.writer = Object.assign(this.storageService.getStorage());

    this.getHistories();
  }

  async getHistories() {
    this.lstHistories = await this.apiQuiz.getGlobal<History[]>(
      "/writers/history/user/get/" + this.writer.idWriter
    );
    console.log(this.lstHistories);
  }
  async historyRegister(item?: History) {

    if (item) {
      this.dataService.set(item);
    } else {
      this.dataService.set(undefined);
    }
    this.router.navigate(["/dashboard/history-register"]);
  }
  async deleteHistory(item: History) {
    item.state = false;
    let estado = await this.apiQuiz.postGlobal<History>(
      "/writers/history/create",
      item
    );
    if (estado) {
      this.ngOnInit();
    } else {
      console.log("Error al eliminar");
    }
  }
  async goToQuestion(item: History) {
    this.dataService.set(item);
    this.router.navigate(["/dashboard/quiz-list"]);
  }

}
