import { Component, OnInit } from '@angular/core';

import { CrudespeciesService } from '../services/crudespecies.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-especie',
  templateUrl: './especie.page.html',
  styleUrls: ['./especie.page.scss'],
})
export class EspeciePage implements OnInit {

  especies: any;
  especieImagen: string;
  especieFamilia: string;
  especieOrden: string;
  especieEspecie: string;
  especieNombre: string;
  especieCites: string;
  especieLea: string;
  especieUicn: string;
  especieDistEstacional: string;
  especieDescripcion: string;
  especieEcologia: string;
  especieHabitat: string;
  especieDistribucion: [];

  constructor(
    private navCtrl: NavController,
    private crudService: CrudespeciesService
  ) { }

  ngOnInit() {
    this.crudService.read_especie().subscribe(data => {

      this.especies = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          imagen: e.payload.doc.data()['imagen'],
          familia: e.payload.doc.data()['familia'],
          orden: e.payload.doc.data()['orden'],
          especie: e.payload.doc.data()['especie'],
          nombre: e.payload.doc.data()['nombre'],
          cites: e.payload.doc.data()['cites'],
          lea: e.payload.doc.data()['lea'],
          uicn: e.payload.doc.data()['uicn'],
          distEstacional: e.payload.doc.data()['distEstacional'],
          descripcion: e.payload.doc.data()['descripcion'],
          ecologia: e.payload.doc.data()['ecologia'],
          habitat: e.payload.doc.data()['habitat'],
          distribucion: e.payload.doc.data()['distribucion'],
        };
      })
      console.log(this.especies);

    });
  }

}
