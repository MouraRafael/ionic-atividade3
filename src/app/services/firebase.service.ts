import { Injectable } from '@angular/core';
import { Firestore,doc, collection,setDoc, collectionData, docSnapshots } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { map, Observable } from 'rxjs';

import { Pessoa } from '../models/pessoa.model';
import { Usuario } from '../models/usuario.model';



const NOME_DB = 'pessoas'




@Injectable({
providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fireStore: Firestore
  ) { }

  cadastra(pessoa: Pessoa): Promise<void>{
    const document = doc(collection(this.fireStore, NOME_DB));
    return setDoc(document, pessoa)
  }

  listar():Observable<Pessoa[]>{
    const pessoasCollection = collection(this.fireStore,NOME_DB);

    return collectionData(pessoasCollection, {idField: 'id'})
    .pipe(
      map(result => result as Pessoa[])
    );
  }

  encontrarPorId(id:string):Observable<Pessoa>{
    const document = doc(this.fireStore, `${NOME_DB}/${id}`);

    return docSnapshots(document).pipe(
      map(doc =>{
        const id = doc.id;
        const data = doc.data();

        return { id, ...data } as Pessoa;
      })
    );
  }

  atualizar(pessoa:Pessoa): Promise<void>{
    const document = doc(this.fireStore, NOME_DB, pessoa?.id)
    const {id, ...data} = pessoa;

    return setDoc(document,data)
  }
  remover(id: string): Promise<void>{
    const document = doc(this.fireStore, NOME_DB,id)
    return deleteDoc(document)
  }

}
