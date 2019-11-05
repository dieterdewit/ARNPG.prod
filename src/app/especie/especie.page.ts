import { Component, OnInit } from '@angular/core';

//servicios
import { CrudespeciesService } from '../services/crudespecies.service';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-especie',
  templateUrl: './especie.page.html',
  styleUrls: ['./especie.page.scss'],
})
export class EspeciePage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  infoNums: String = "";
  info2L: String = "";
  infoIs: String = "";
  info1L: String = "";
  load: boolean = false;

  constructor(
    public crudService: CrudespeciesService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.getData();
    
  }

  myFunction(num: Number) {
    //console.log("entro");
    let popup: boolean;
    if(num == 1){
      popup = document.getElementById("myPopup1").classList.toggle("show");
      if(document.getElementById("myPopup2").classList.toggle("show") == true){
        popup= document.getElementById("myPopup2").classList.toggle("show");
      }
      if(document.getElementById("myPopup3").classList.toggle("show") == true){
        popup= document.getElementById("myPopup3").classList.toggle("show");
      }
      if(document.getElementById("myPopup4").classList.toggle("show") == true){
        popup= document.getElementById("myPopup4").classList.toggle("show");
      }
    }else if(num == 2){
      popup= document.getElementById("myPopup2").classList.toggle("show");
      if(document.getElementById("myPopup1").classList.toggle("show") == true){
        popup= document.getElementById("myPopup1").classList.toggle("show");
      }
      if(document.getElementById("myPopup3").classList.toggle("show") == true){
        popup= document.getElementById("myPopup3").classList.toggle("show");
      }
      if(document.getElementById("myPopup4").classList.toggle("show") == true){
        popup= document.getElementById("myPopup4").classList.toggle("show");
      }
    }else if(num == 3){
      popup= document.getElementById("myPopup3").classList.toggle("show");
      if(document.getElementById("myPopup2").classList.toggle("show") == true){
        popup= document.getElementById("myPopup2").classList.toggle("show");
      }
      if(document.getElementById("myPopup1").classList.toggle("show") == true){
        popup= document.getElementById("myPopup1").classList.toggle("show");
      }
      if(document.getElementById("myPopup4").classList.toggle("show") == true){
        popup= document.getElementById("myPopup4").classList.toggle("show");
      }
    }else if(num == 4){
      popup = document.getElementById("myPopup4").classList.toggle("show");
      if(document.getElementById("myPopup2").classList.toggle("show") == true){
        popup= document.getElementById("myPopup2").classList.toggle("show");
      }
      if(document.getElementById("myPopup3").classList.toggle("show") == true){
        popup= document.getElementById("myPopup3").classList.toggle("show");
      }
      if(document.getElementById("myPopup1").classList.toggle("show") == true){
        popup= document.getElementById("myPopup1").classList.toggle("show");
      }
    }
    
    //popup
  }
  getData(){
    this.route.data.subscribe(routeData => {
     let data = routeData['data'];
    if (data) {
      this.item = data;
      console.log("si data");
      console.log(Object.keys(this.item));
    }
    if (data) {
      this.item = data;

      if(this.item.lea == "1"){
        this.item.lea = "1";
        this.infoNums = "Casi Extinta";
      }else if(this.item.lea == "2"){
        this.item.lea = "2"
        this.infoNums = "En Grave peligro de extincion";
      }else if(this.item.lea == "3"){
        this.item.lea = "3"
        this.infoNums = "Manejo especial / Uso controlado";
      }else if (this.item.lea == "X"){
        this.item.lea = "X"
        this.infoNums = "No esta en la lista roja de fauna CONAP";
      }else{
        this.item.lea = "-"
        this.infoNums = "Informacion no disponible";
      }

      if(this.item.cites == "I"){
        this.item.cites = "I"
        this.infoIs = "Especie con mayor grado de peligro";
      }else if(this.item.cites == "II"){
        this.item.cites = "II"
        this.infoIs = "Especie no amenazada, pero puede estarlo";
      }else if(this.item.cites == "III"){
        this.item.cites = "III"
        this.infoIs = "Especie protegida al menos en un pais";
      }else if (this.item.cites == "X"){
        this.item.cites = "X"
        this.infoIs = "Especie no protegida por CITES";
      }else{
        this.item.cites = "-"
        this.infoIs = "Informacion no disponible";
      }

      if(this.item.uicn == "LC"){
        this.item.uicn = "LC"
        this.info2L = "Poca preocupacion de extincion";
      }else if(this.item.uicn == "VU"){
        this.item.uicn = "VU"
        this.info2L = "Vulnerable a extincion";
      }else if(this.item.uicn == "EN"){
        this.item.uicn = "EN"
        this.info2L = "En peligro de extincion";
      }else if (this.item.uicn == "CR"){
        this.item.uicn = "CR"
        this.info2L = "En peligro critico de extincion";
      }else if (this.item.uicn == "DD"){
        this.item.uicn = "DD"
        this.info2L = "Datos insuficientes";
      }else{
        this.item.uicn = "-"
        this.info2L = "Informacion no disponible";
      }

      if(this.item.distEstacional == "R"){
        this.item.distEstacional = "R"
        this.info1L = "Especie residente o que no migra";
      }else if(this.item.distEstacional == "M"){
        this.item.distEstacional = "M"
        this.info1L = "Especie migratoria";
      }else if(this.item.distEstacional == "T"){
        this.item.distEstacional = "T"
        this.info1L = "Especie transitoria";
      }else if (this.item.distEstacional == "ER"){
        this.item.distEstacional = "ER"
        this.info1L = "Especie endemiga regional";
      }else{
        this.item.distEstacional = "-"
        this.info1L = "Informacion no disponible";
      }
    }
    else{
      console.log("no data");
    }
    });
  }

}


