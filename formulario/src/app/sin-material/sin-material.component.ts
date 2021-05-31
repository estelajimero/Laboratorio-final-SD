import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from './../usuario';

@Component({
  selector: 'app-sin-material',
  templateUrl: './sin-material.component.html',
  styleUrls: ['./sin-material.component.css']
})

export class SinMaterialComponent implements OnInit {
  accion          : String = 'registrar'
  posicion        : any    = 0

  listaUsuarios   : Array<Usuario> = [] 

  usuario : Usuario = {
    nombre          : '',
    apellidos       : '',
    edad            : '',
    dni             : '',
    cumpleanos      : new Date(),
    colorFavorito   : '',
    sexo            : ''
  }

  constructor(
    private http    : HttpClient,
  ) { }

  // Métodos
  registroUsuario(form: NgForm) {
    if(this.accion === 'registrar'){
      this.http.post(`http://localhost:3000/contacto`, this.usuario).subscribe({
        next: (data : Usuario) => {
          this.listaUsuarios.push(data);

          alert('Usuario añadido correctamente');
        },
        error: error => {
          alert('Hubo un error al añadir el usuario');

          console.error(error);
        }
      });

    } else {
      let usuarioId = document.getElementById('userid');

      this.http.put(`http://localhost:3000/contacto/` + usuarioId.innerHTML.slice(4, usuarioId.innerHTML.length), this.usuario)
      .subscribe({
        next: (data : Usuario) => {
          this.listaUsuarios[this.posicion] = data;
          this.accion = 'registrar';

          alert('Usuario actualizado correctamente');
        },
        error: error => {
          alert('Hubo un error al actualizar el usuario');

          console.error(error);
        }
      });
    }

    this.usuario = {
      nombre        : '',
      apellidos     : '',
      edad          : '',
      dni           : '',
      cumpleanos    : new Date(),
      colorFavorito : '',
      sexo          : ''
    }

    form.resetForm()
  }  
  
  borrarUsuario(posicionBorrar : number) : void {
    let usuarioId = document.getElementById('userid');

    this.http.delete(`http://localhost:3000/contacto/` + usuarioId.innerHTML.slice(4, usuarioId.innerHTML.length)).subscribe({
    next: data => {
      this.listaUsuarios.splice(posicionBorrar, 1)
      alert('Usuario eliminado correctamente');
    },
    error: error => {
      alert('No se ha podido eliminar el usuario');
      console.error(error);
    }
    });
  }

  actualizarUsuario(posicionActualizar : number) : void {
    this.usuario = this.listaUsuarios[posicionActualizar];
    this.accion = 'actualizar';
    this.posicion = posicionActualizar;
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/contacto`)
    .subscribe({
      next: (data : any) => {
        data.forEach((element: Usuario) => {
          this.listaUsuarios.push(element);
        });
      },
      error: error => {
        console.error('Ha ocurrido un error', error);
      }
    });
  }
}
