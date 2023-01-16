import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPessoaComponent } from './cadastro-pessoa.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { CorreiosService } from '../services/correios.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CadastroPessoaComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[FirebaseService,CorreiosService]
})
export class CadastroPessoaModule { }
