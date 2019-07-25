import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CrudespeciesService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore
  ) { }

  getEspecies(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('especies').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    })
  }

  getEspecie(especieId){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('especies').doc(especieId).valueChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      }, err => {
        reject(err)
      })
    });
  }

  getAvistamientos(){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('avistamientos').snapshotChanges();
      resolve(this.snapshotChangesSubscription);
    })
  }

  getAvistamiento(avistamientoId){
    return new Promise<any>((resolve, reject) => {
      this.snapshotChangesSubscription = this.afs.collection('avistamientos').doc(avistamientoId).valueChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      }, err => {
        reject(err)
      })
    });
  }

  createAvistamiento(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('especies').add({
        nombre: value.nombre,
        fecha: value.fecha,
        comentario: value.comentario,
        especie: value.especie,
        geolocalizacion: value.geolocalizacion,
        lugar: value.lugar,
        revisado: value.habitat,
        multimedia: value.multimedia
      })
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

  updateEspecie(especieId, value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('especies').doc(especieId).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  deleteEspecie(especieId){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('especies').doc(especieId).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  createEspecie(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('especies').add({
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
        imagen: value.imagen
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
      let imageRef = storageRef.child(randomId);
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

}
