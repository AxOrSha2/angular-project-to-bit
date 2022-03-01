import { Component, NgModuleFactory, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(data => {
      this.userList = data
    },error =>{
      console.log(error);
    });
  }

  deleteUser(id: String) {
    Swal.fire({
      title: '¿Seguro de eliminar al usuario?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
          this._userService.deleteUser(id).subscribe(data => {
              Swal.fire({
                  icon: 'success',
                  title: 'Producto eliminado'
              })
              this.getUsers()
          }, error => {
              console.log(error);
          })
      }
    })
  }

}
