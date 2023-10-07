import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories/usuario.repository';
const generator = require('generate-password');
const CryptoJS = require("crypto-js/md5");
const MD5 = require("crypto-js/md5");

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(
    @repository(UsuarioRepository)
    public repositorioUsuario: UsuarioRepository,
  ) { }


  /*
   * Add service methods here
   */
  /**
   * Crear una clave aleatoria
   * @returns cadena aleatoria de n caracteres
   */
  crearTextoAleatorio(n: number): string {
    let clave = generator.generate({
      length: n,
      numbers: true
    });
    return clave;
  }

  /**
   * Cifrar una cadena de texto con método MD5
   * @param cadena cadena de texto a cifrar
   * @returns cadena cifrada con MD5
   */
  cifrarTexto(cadena: string): string {
    // siempre se debe pasar a string porque en caso contrario se hará un arreglo de caracteres
    let cadenaCifrada = MD5(cadena).toString();
    return cadenaCifrada;
  }

  /**
   * Buscar un usuario por sus credenciales de acceso
   * Verificar si las credenciales corresponden a un usuario
   * @param credenciales credenciales que se van a verificar
   * @returns null si las credenciales no corresponden a un usuario o el usuario si las credenciales son correctas
   */
  async identificarUsuario(credenciales: Credenciales): Promise<Usuario | null> {
    let usuario = await this.repositorioUsuario.findOne({
      where: {
        correo: credenciales.correo,
        clave: credenciales.clave
      }

    })
    return usuario as Usuario;
  }
}
