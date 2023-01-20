/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../Models/dto/create-usuario.dto';
import { IRetorno } from './../../../IRetorno';
import { Usuario } from './../Models/entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<IRetorno<Usuario>> {
    return;
  }

  async pegarTodosUsuario(): Promise<IRetorno<Usuario[]>> {
    try {
      const usuario = await this.usuarioRepository.find({
        relations: ['imovel'],
        select: ['id' , 'nome']
      });
      if (!usuario.length)
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Não há usuario registrado',
        }
      return {
        status: HttpStatus.OK,
        message: '',
        data: usuario,
      }

    } catch (err) {
      throw new HttpException(
        {
          status: err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async mostrarUmUsuario(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
      });

      if (!usuario)
        throw new HttpException(
          `Usuario ${id} não foi encontrado!!`,
          HttpStatus.NOT_FOUND,
        );
      return {
        status: HttpStatus.OK,
        messege: '',
        data: usuario
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async atualizarUsuario(id: number, usuario: CreateUsuarioDto): Promise<Usuario> {
    let usuarioExiste = await this.usuarioRepository.findOne({
      where: {
        id,
      }
    });
    if (!usuarioExiste) {
      throw new HttpException(
        `A empresa '${usuario.nome}' não foi encotrado no sistema!`,
        HttpStatus.NOT_FOUND,
      );
    };
    usuarioExiste = {...usuarioExiste, ...usuario}

    try {
      const usuario = await this.usuarioRepository.save(usuarioExiste);
      return {
        status: HttpStatus.OK,
        message: 'Atualizado',
        data: usuario
      };
    } catch (err) {
      throw new HttpException(
        {
          status: err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletarUsuario(id: number): Promise<Usuario> {
    const usuarioExiste = await this.usuarioRepository.findOne(id);
    if (!usuarioExiste)
      throw new HttpException(
        `O menu de id '${id}' não foi encontrado!`,
        HttpStatus.NOT_FOUND,
      );
    try {
      await this.usuarioRepository.delete(id);
      return {
        status: HttpStatus.OK,
        message: `Usuario de id '${id} foi deletado com sucesso!'`,
        data: usuarioExiste,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
          message: err.message,
        },
        err.status ? err.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
