import { OperatorAvailableDto } from './../../../dto/operator-available.dto';
import { ResOperadorDto } from './../../../dto/res-operador.dto';
import { SupportLanguages } from './../../../models/SupportLanguages';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OperatorService } from '../services/operator.service';
import { Operators } from '../../../models/Operators';
import { PayOptions } from '../../../models/PayOptions';
import { Languages } from '../../../models/Languages';
import { Countries } from '../../../models/Countries';
import { ReqOperatorsDto } from '../../../dto/req-operators.dto';
import { GlobalDto } from '../../../dto/global.dto';
import { UsersOperators } from '../../../models/UsersOperators';
import { LoginDto } from '../../../dto/login.dto';
import { UserValidator } from '../../../dto/user-validator.dto';



@Controller('operator')
export class OperatorController {
    constructor(
        private operatorService: OperatorService
    )
    { }

    //TODO: tareas
    @Get('list-operator')
    listOperator(): Promise<Array<Operators>> {
        return this.operatorService.listOperator();
    }
    @Post('create-operator')
    createOperator(@Body() req: Operators): Promise<Operators>{
        return this.operatorService.createOperator(req);
    }
    @Post('create-support-languages')
    createSupportLanguages(@Body() req: SupportLanguages[]): Promise<SupportLanguages[]> {
        return this.operatorService.createSupportLanguages(req);
    }
    @Get('list-support-languages-by-operator/:id')
    listSupportLanguagesByOperator(@Param('id') idOperator: string): Promise<SupportLanguages[]> {
        return this.operatorService.listSupportLanguagesByOperator(idOperator);
    }
    @Post('create-support-language-one')
    createSupportLanguagesOne(@Body() req: SupportLanguages): Promise<SupportLanguages> {
        return this.operatorService.createSupportLanguagesOne(req);
    }
    @Post('create-pay-options')
    createPayOptions(@Body() req: PayOptions): Promise<PayOptions> {
        return this.operatorService.createPayOptions(req);
    }
    @Get('list-pay-options')
    listPayOptions(): Promise<PayOptions[]> {
        return this.operatorService.listPayOptions();
    }
    @Post('create-languages')
    createLanguages(@Body() req: Languages): Promise<Languages> {
        return this.operatorService.createLanguages(req);
    }
    @Get('list-languages')
    listLanguages():Promise<Languages[]>{
        return this.operatorService.listLanguages();
    }
    @Post('create-countries')
    createCountries(@Body() req: Countries):Promise<Countries> {
        return this.operatorService.createCountries(req);
    }
    @Get('list-countries')
    listCountries():Promise<Countries[]>{
        return this.operatorService.listCountries();
    }
    @Post('register-operator')
    async agregarNuevoOperador(@Body() req: ReqOperatorsDto): Promise<ResOperadorDto> {
        return this.operatorService.agregarNuevoOperador(req);
    }
    @Get('operator-by-id/:id')
    findById(@Param('id') id: string): Promise<Operators> {
        return this.operatorService.findById(id);
    }
    @Post('login-operator')
    findByUserAndPass(@Body() login: LoginDto): Promise<Operators> {
        console.log(login);
        return this.operatorService.findByUserAndPass(login.user,login.pass);
    }
    @Get('user-operator-by-operator/:id')
    findUserOperatorByOperator(@Param('id') id: string): Promise<Array<UsersOperators>> {
        return this.operatorService.findUserOperatorByOperator(id);
    }
    @Get('operator-by-language/:id')
    async findByLanguage(@Param('id') idLanguage: string): Promise<OperatorAvailableDto> {
        return await this.operatorService.findByLanguage(idLanguage);
    }
    @Post('create-user-operator')
    async registerUserOperator(@Body() userOperator: UsersOperators): Promise<UsersOperators>{
        return await this.operatorService.registerUserOperator(userOperator);
    }
    @Get('enable-operator/:id')
    async enableOperator(@Param('id') id: string): Promise<Operators>{
        console.log(id);
        return await this.operatorService.enableOperator(id);
    }
    @Get('ejemplo/:id')
    async ejemplo(@Param('id') idLanguage: string){
        return this.operatorService.ejemplo(idLanguage);
    }
    @Post('operator-validate')
    findUserByIdAndEmail(@Body() request: UserValidator):Promise<GlobalDto> {
        return this.operatorService.findUserByIdAndEmail(request);
    }
    @Get('email-validate/:email')
    validateEmail(@Param('email') email: string): Promise<GlobalDto>{
        return this.operatorService.validateEmail(email);
    }
}
