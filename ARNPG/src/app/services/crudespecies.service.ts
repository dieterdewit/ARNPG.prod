import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudespeciesService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_especie(record) {
    return this.firestore.collection('especies').add(record);
  }

  read_especie() {
    return this.firestore.collection('especies').snapshotChanges();
  }

  update_especie(recordID,record){
    this.firestore.doc('especies/' + recordID).update(record);
  }

  delete_especie(record_id) {
    this.firestore.doc('especies/' + record_id).delete();
  }
}