import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { FirebaseService } from '../services/firebase.service';
import { Pessoa } from '../models/pessoa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup

  @ViewChild('loginFormGroupDirective') loginFormGroupDirective!:FormGroupDirective

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'email': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required])
    })
  }

  login(){
    const loga = this.loginFormGroup.getRawValue() as Usuario;

    let pessoa:Pessoa;

    this.firebaseService.buscarEmail(loga.email).subscribe({
      next: (resultado)=>{
        resultado.forEach(element => {
          if(loga.email === element.email) {
            pessoa = element;

            if(pessoa.email == loga.email && pessoa.senha == loga.senha){
              this.router.navigateByUrl(`main/tabs/tab2/${pessoa.id}`)
            }

          }
        });
      },
      error:(err) => console.error(err)
    });

    console.log(loga)

  }



}
