import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit {

  userForm: FormGroup;
  form_title = 'Crear usuario';
  id: String | null;
  only_numbers = /^([0-9])*$/;

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private idUserPath: ActivatedRoute) { 
    this.userForm = this.fb.group({
      fullName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      cellphone: ['',[Validators.required,Validators.pattern(this.only_numbers)]],
      address: ['',Validators.required]
    });

    this.id = this.idUserPath.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getUserInfo()
  }

  userInfo() {
    const user_form: User = {
        fullName: this.userForm.get('fullName')?.value,
        email: this.userForm.get('email')?.value,
        cellphone: this.userForm.get('cellphone')?.value,
        address: this.userForm.get('address')?.value,
    }
    if (this.id === null) {
        //When the user is created
        this._userService.postUsers(user_form).subscribe(data => {
            this.router.navigate(['/user']);
            Swal.fire({
                icon: 'success',
                title: 'Dato guardado',
                text: 'El usuario se ha creado correctamente'
            })
        }, error => {
            Swal.fire({
                icon: 'error',
                title: 'Algo esta pasando',
                text: 'Comuniquese con el administrador'
            })
            console.log(error)
        })
    } else {
        //cuando el usuario actualiza
        this._userService.putUsers(this.id, user_form).subscribe(data => {
            this.router.navigate(['/user']);
            Swal.fire({
                icon: 'success',
                title: 'Dato actualizado',
                text: 'El usuario se actualizó correctamente'
            })
        }, error => {
            Swal.fire({
                icon: 'error',
                title: 'Algo esta pasando',
                text: 'Comuniquese con el administrador'
            })
            console.log(error)
        })
    }
  }

  getUserInfo() {
    if (this.id !== null) {
      this.form_title = 'Actualizar datos';
      this._userService.getUser(this.id).subscribe(data => {
        this.userForm.setValue({
          fullName: data.fullName,
          email: data.email,
          cellphone: data.cellphone,
          address: data.address
        })
      },error =>{
        console.log(error)
      });
    }
  }

}
