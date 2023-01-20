/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './componetes/usuario/usuario.module';
import { ImovelModule } from './componetes/imovel/imovel.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'imovelweb',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsuarioModule,
    ImovelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
