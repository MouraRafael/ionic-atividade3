import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Pessoa } from '../models/pessoa.model';
import { CorreiosService } from '../services/correios.service';
import { Endereco } from '../models/endereco.model';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss'],
})
export class CadastroPessoaComponent implements OnInit {
  cadastroForm!:FormGroup
  validaUserName = true;
  validaEmail = true;

    @ViewChild('cadastroFormDirective') cadastroFormDirective!:FormGroupDirective


  constructor(
    private firebaseService:FirebaseService,
    private correiosService:CorreiosService
  ) { }

  ngOnInit():void {
    this.cadastroForm = new FormGroup({
      'username': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required]),
      'nome': new FormControl('',[Validators.required/*,Validators.pattern(/^[a-zA-Z]/),Validators.minLength(6),Validators.maxLength(60)*/]),
    'email': new FormControl('',[Validators.required/*,Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)*/]),
  'cpf': new FormControl('',[Validators.required/*,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)*/]),
      'endereco': new FormGroup({
        'cep': new FormControl('',[Validators.required]),
        'uf': new FormControl('',[Validators.required]),
        'localidade': new FormControl('',[Validators.required]),
        'bairro': new FormControl('',[Validators.required]),
        'logradouro': new FormControl('',[Validators.required]),
        'numero': new FormControl('',[Validators.required, Validators.max(5), Validators.min(1)])
      })
    })
  }

  registra(){
    const pessoa = this.cadastroForm.getRawValue() as Pessoa;

    if(this.validaEmail && this.validaUserName){
      this.firebaseService.cadastra(pessoa)
    }
  }

  verificaUsername(){
    this.validaUserName = true
    this.firebaseService.buscarUserName(this.username).subscribe({
      next: (resultado)=>{
        resultado.forEach(element => {


          if(this.username === element.username){
            console.log(element.username)
            console.log(this.username)
            this.validaUserName = false
          }


        });
      },
      error:(err) => console.error(err)
    })
  }
  verificaEmail(){
    this.validaEmail = true
    this.firebaseService.buscarEmail(this.email).subscribe({
      next: (resultado)=>{
        resultado.forEach(element => {


          console.log(this.validaEmail)
          if(this.email === element.email) {

            this.validaEmail = false
          }
        });
      },
      error:(err) => console.error(err)
    })
  }


  carregaEndereco(){
    const cep = this.cadastroForm.get('endereco')?.get('cep')?.value;
    this.correiosService.pegaEndereco(cep).subscribe({
      next:(end:Endereco)=>{
        console.log(end)
        this.cadastroForm.get('endereco')?.patchValue({
          cep:end.cep,
          uf: end.uf,
          localidade: end.localidade,
          bairro: end.bairro,
          logradouro: end.logradouro
        })
      }
    })
  }

  get username(){ return this.cadastroForm.get('username')?.getRawValue()}
  get email(){ return this.cadastroForm.get('email')?.getRawValue()}
}
