import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  contactFormGroup!:FormGroup

  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!:FormGroupDirective

  constructor() { }

  ngOnInit() {
    this.contactFormGroup = new FormGroup({
      'email': new FormControl('',[Validators.required]),
      'senha': new FormControl('',[Validators.required])
    })
  }

  login(){
    

  }



}
