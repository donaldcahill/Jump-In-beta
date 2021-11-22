import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { OperatorModule } from './modules/operator/operator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      //host: 'localhost',
      host: 'first-db.cwlocepqhmf2.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: "admin",
			password: "@Jumpinhelp2021",
      /*username: "root",
			password: "jhipassword",*/
      database: 'jih',
      synchronize: false,
      entities: [__dirname + '/models/**/*{.ts,.js}'],
      autoLoadEntities: true,
      
    }),
    UserModule,
    OperatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
