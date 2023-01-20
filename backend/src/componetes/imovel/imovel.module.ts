import { Module } from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { ImovelController } from './imovel.controller';

@Module({
  controllers: [ImovelController],
  providers: [ImovelService]
})
export class ImovelModule {}
