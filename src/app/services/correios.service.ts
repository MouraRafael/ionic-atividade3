import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(
    private http:HttpClient
  ) { }

  pegaEndereco(cep:string):Observable<Endereco>{
    return this.http.get<Endereco>(`${environment.correiosWS}/${cep}/json`)
  }
}
