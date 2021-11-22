/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm/repository/Repository';
import { Users } from '../../../models/Users';
import { UsersOperators } from '../../../models/UsersOperators';
import { GlobalDto } from '../../../dto/global.dto';
import { UserValidator } from '../../../dto/user-validator.dto';
import { Countries } from '../../../models/Countries';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly _usersRepository: Repository<Users>,
        @InjectRepository(UsersOperators)
        private readonly _usersOperatorsRepository: Repository<UsersOperators>,
        @InjectRepository(Countries)
        private readonly _countriesRepository: Repository<Countries>,
    ) { }

    async createUser(user: Users): Promise<Users>{
        try{
            user.registrationDate = new Date();
            if(user.state === undefined) {
                user.state = true;
            }
            let country = await this._countriesRepository.findOne({idCountry: user.idCountry})
            let newPhone = country.callingCode + user.phone;
            user.phone = newPhone;
            return this._usersRepository.save(user);
        }catch(ex) {

        }
        
    }
    findUserByUserPass(user: string, pass: string):Promise<Users> {
        console.log(user)
        console.log(pass)
        return this._usersRepository.findOneOrFail({email: user, pass: pass, state: true});
    }
    findUserOperatorByUser(idUser: string): Promise<UsersOperators[]> {
        return this._usersOperatorsRepository.find({idUser: idUser});
    }
    createUserOperators(userOperator: UsersOperators): Promise<UsersOperators> {
        return this._usersOperatorsRepository.save(userOperator);
    }
    async findUserByIdAndEmail(request: UserValidator):Promise<GlobalDto> {
        let response: GlobalDto = <GlobalDto>{};
        const userResponse = await this._usersRepository.findOne({idUser: request.idUser, email: request.user, state: true});
        if(userResponse){
            response.message = "";
            response.state = true;
        } else {
            response.message = "El usuario no se encuentra disponible.";
            response.state = false;
        }
        return response;
    }
    async validateEmail(email: string): Promise<GlobalDto>{
        let response: GlobalDto = <GlobalDto>{};
        console.log(email)
        const responseEmail = await this._usersRepository.findOne({email: email, state: true});
        console.log(responseEmail);
        if(responseEmail){
            response.message = "El correo ya está registrado intenta con otro.";
            response.state = false;
        } else {
            response.message = "";
            response.state = true;
        }
        console.log(response);
        return response;
    }
}
