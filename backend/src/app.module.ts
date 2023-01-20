import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './componetes/usuario/usuario.module';
import { ImovelModule } from './componetes/imovel/imovel.module';
import { UsuarioModule } from './componetes/usuario/usuario.module';

@Module({
  imports: [UsuarioModule, ImovelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
