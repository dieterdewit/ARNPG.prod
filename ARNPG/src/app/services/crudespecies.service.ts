import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class CrudespeciesService {

  snapshotChangesSubscription: any;

  constructor(
    private firestore: AngularFirestore
  ) { }

  getEspecies(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.firestore.collection('especies').snapshotChanges();
      resolve(this.snapshotChangesSubscription); 
    })
  }

  getEspecie(especieId){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.firestore.doc<any>('especies/' + especieId).valueChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      }, err => {
        reject(err)
      }) 
    });
  }

  createEspecie(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.firestore.collection('especies').add({
        imagen: value.imagen,
        familia: value.familia,
        orden: value.orden,
        especie: value.especie,
        nombre: value.nombre,
        cites: value.cites,
        lea: value.lea,
        uicn: value.uicn,
        distEstacional: value.distEstacional,
        descripcion: value.descripcion,
        ecologia: value.ecologia,
        habitat: value.habitat,
        distribucion: value.distribucion,
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }

  updateEspecie(especieId, value){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('especies').doc(especieId).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteEspecie(especieId){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('especies').doc(especieId).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }


  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

}
