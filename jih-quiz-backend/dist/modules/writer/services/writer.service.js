"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Writer_1 = require("../../../model/Writer");
const Category_1 = require("../../../model/Category");
const History_1 = require("../../../model/History");
const Question_1 = require("../../../model/Question");
const Answer_1 = require("../../../model/Answer");
let WriterService = class WriterService {
    constructor(_writerRepository, _categoryRepository, _historyRepository, _questionRepository, _answerRepository) {
        this._writerRepository = _writerRepository;
        this._categoryRepository = _categoryRepository;
        this._historyRepository = _historyRepository;
        this._questionRepository = _questionRepository;
        this._answerRepository = _answerRepository;
    }
    async login(request) {
        let response = {};
        try {
            response.user = await this._writerRepository.findOneOrFail({
                where: {
                    email: request.email,
                    password: request.password,
                },
            });
            if (response.user) {
                response.state = true;
                response.message = '';
            }
            else {
                response.state = false;
                response.message = 'Usuario o Contraseña Inválidos.';
            }
        }
        catch (e) {
            response.state = false;
            response.message = 'Usuario o Contraseña Inválidos.';
        }
        finally {
            return response;
        }
    }
    async writerRegister(writer) {
        let response = {};
        try {
            writer.dateRegister = new Date();
            let writerSaved = await this._writerRepository.save(writer);
            if (writerSaved) {
                response.user = writerSaved;
                response.state = true;
                response.message = '';
            }
            else {
                response.state = false;
                response.message = 'Error al registrar el usuario.';
            }
        }
        catch (e) {
            console.log(e);
            response.state = false;
            response.message = 'Error al registrar el usuario.';
        }
        finally {
            return response;
        }
    }
    getWriterById(id) {
        return this._writerRepository.findOne(id);
    }
    listWriter() {
        return this._writerRepository.find();
    }
    async categoryRegister(category) {
        category.state = 1;
        console.log(category);
        return await this._categoryRepository.save(category);
    }
    getCategoryById(id) {
        return this._categoryRepository.findOne(id);
    }
    listCategory() {
        return this._categoryRepository.find();
    }
    historyRegister(history) {
        history.dateRegister = new Date();
        return this._historyRepository.save(history);
    }
    getHistoryById(id) {
        return this._historyRepository.findOne(id);
    }
    listHistoryByUserId(userId) {
        return this._historyRepository.find({
            where: {
                idWriter: userId,
            },
            relations: ['idCategory2', 'questions', 'questions.answers'],
        });
    }
    historyContainQuestion(id) {
        return this._questionRepository.find({
            where: {
                historyId: id,
            },
        });
    }
    answerContainCorrect(id) {
        return this._answerRepository.find({
            where: {
                questionId: id,
                correct: true,
            },
        });
    }
    questionRegister(question) {
        question.dateRegister = new Date();
        return this._questionRepository.save(question);
    }
    async quizRegister(question) {
        const res = {};
        const connection = (0, typeorm_2.getConnection)();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const detalleRepository = queryRunner.manager.getRepository(Question_1.Question);
            const actividadRepository = queryRunner.manager.getRepository(Answer_1.Answer);
            question.dateRegister = new Date();
            question.state = 1;
            let questionSaved = await detalleRepository.save(question);
            if (questionSaved) {
                for (let item of question.answers) {
                    item.idQuestion = questionSaved.idQuestion;
                    item.state = 1;
                    item.dateRegister = new Date();
                    let answerSaved = await actividadRepository.save(item);
                }
                res.state = true;
                res.message = 'Actividad creada exitosamente';
                await queryRunner.commitTransaction();
            }
            else {
                res.state = false;
                res.message = 'Error al crear la actividad';
                await queryRunner.rollbackTransaction();
            }
        }
        catch (error) {
            res.state = false;
            res.message = 'Error al crear la actividad';
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
            return res;
        }
    }
    getQuestionById(id) {
        return this._questionRepository.findOne(id);
    }
    listQuestionsByHistoryId(historyId) {
        return this._questionRepository.find({
            where: {
                idHistory: historyId,
            },
            relations: ['idHistory2', 'answers'],
        });
    }
    answerRegister(answer) {
        answer.dateRegister = new Date();
        return this._answerRepository.save(answer);
    }
    listAnswersByQuestionId(questionId) {
        return this._answerRepository.find({
            where: {
                questionId: questionId,
            },
        });
    }
};
WriterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Writer_1.Writer)),
    __param(1, (0, typeorm_1.InjectRepository)(Category_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(History_1.History)),
    __param(3, (0, typeorm_1.InjectRepository)(Question_1.Question)),
    __param(4, (0, typeorm_1.InjectRepository)(Answer_1.Answer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WriterService);
exports.WriterService = WriterService;
//# sourceMappingURL=writer.service.js.map