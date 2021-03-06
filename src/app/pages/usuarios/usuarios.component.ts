import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // Listado
  usuarios: Usuario[] = [];

  // Paginador
  desde: number = 0;
  totalRegistros: number = 0;

  // Loading
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        if (this.usuarios.length === 0) {
          if ( this.desde < 0 ) {
            this.desde = 0;
          } else {
              this.desde = this.desde - 5;
              this.cargarUsuarios();
          }
        }
      });
  }

  cambiarDesde( valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {
        this.totalRegistros = usuarios.length;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario( usuario: Usuario) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( borrado => {
            this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
      .subscribe( actualizado => {
        this.cargarUsuarios();
      });
  }

}
