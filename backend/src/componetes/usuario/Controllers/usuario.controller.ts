/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUsuarioDto } from '../Models/dto/create-usuario.dto';
import { UsuarioService } from '../Services/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.pegarTodosUsuario();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.mostrarUmUsuario(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usuario: CreateUsuarioDto) {
    return this.usuarioService.atualizarUsuario(+id, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.deletarUsuario(+id);
  }
}
