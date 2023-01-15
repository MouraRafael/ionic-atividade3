import { Component } from '@angular/core';
import { Materia } from '../models/materia.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  materias!:Observable<Materia[]>

  constructor() {}

}
