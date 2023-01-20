import { Injectable } from '@nestjs/common';
import { CreateImovelDto } from './dto/create-imovel.dto';
import { UpdateImovelDto } from './dto/update-imovel.dto';

@Injectable()
export class ImovelService {
  create(createImovelDto: CreateImovelDto) {
    return 'This action adds a new imovel';
  }

  findAll() {
    return `This action returns all imovel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imovel`;
  }

  update(id: number, updateImovelDto: UpdateImovelDto) {
    return `This action updates a #${id} imovel`;
  }

  remove(id: number) {
    return `This action removes a #${id} imovel`;
  }
}
