import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators  } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pessoa:Pessoa = new Pessoa();
  materiasFormGroup!:FormGroup
  @ViewChild('materiaFormGroupDirective') materiaFormGroupDirective!:FormGroupDirective


  constructor(
    private firebaseService:FirebaseService
  ) {}


  ngOnInit(): void {
    this.materiasFormGroup = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'lastname': new FormControl('',[Validators.required]),
      'phone': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required]),
      'category': new FormControl('',[Validators.required])
    })
  }

}
