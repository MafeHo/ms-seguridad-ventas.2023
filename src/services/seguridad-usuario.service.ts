import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('generate-password');
const CryptoJS = require("crypto-js/md5");
const MD5 = require("crypto-js/md5");

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadUsuarioService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  crearClave(): string {
    let clave = generator.generate({
      length: 10,
      numbers: true
    });
    return clave;
  }

  cifrarTexto(cadena: string): string {
    // siempre se debe pasar a string porque en caso contrario se hará un arreglo de caracteres
    let cadenaCifrada = MD5(cadena).toString();
    return cadenaCifrada;
  }
}
