import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterModule } from './modules/writer/writer.module';
import { QuizModule } from './modules/quiz/quiz.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      //host: '192.168.70.103',
      host: 'first-db.cwlocepqhmf2.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '@Jumpinhelp2021',
      //username: 'root',
      //password: 'root',
      //password: 'admin',//pass casa
      database: 'quiz',
      synchronize: false,
      entities: [__dirname + '/model/**/*{.ts,.js}'],
      autoLoadEntities: true,
    }),
    WriterModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
