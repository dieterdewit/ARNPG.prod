import { Component, OnInit } from '@angular/core';

import { CrudespeciesService } from '../services/crudespecies.service';


@Component({
  selector: 'app-gestionar-especies',
  templateUrl: './gestionar-especies.page.html',
  styleUrls: ['./gestionar-especies.page.scss'],
})
export class GestionarEspeciesPage implements OnInit {

  especies: any;
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


  constructor(private crudService: CrudespeciesService) { }

  ngOnInit() {
    this.crudService.read_especie().subscribe(data => {

      this.especies = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
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

  CreateRecord() {
    let record = {};
    record['familia'] = this.especieFamilia;
    record['orden'] = this.especieOrden;
    record['especie'] = this.especieEspecie;
    record['nombre'] = this.especieNombre;
    record['cites'] = this.especieCites;
    record['lea'] = this.especieLea;
    record['uicn'] = this.especieUicn;
    record['distEstacionl'] = this.especieDistEstacional;
    record['descripcio '] = this.especieDescripcion;
    record['ecologia'] = this.especieEcologia;
    record['habitat'] = this.especieHabitat;
    record['distribucion'] = this.especieDistribucion;
    this.crudService.create_especie(record).then(resp => {
      this.especieFamilia = "";
      this.especieOrden = "";
      this.especieEspecie = "";
      this.especieNombre = "";
      this.especieCites = "";
      this.especieLea = "";
      this.especieUicn = "";
      this.especieDistEstacional = "";
      this.especieDescripcion = "";
      this.especieEcologia = "";
      this.especieHabitat = "";
      this.especieDistribucion = [];
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_especie(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditFamilia = record.Familia ;
    record.EditOrden = record.Orden;
    record.EditEspecie = record.Especie;
    record.EditNombre = record.Nombre;
    record.EditCites = record.Cites;
    record.EditLea = record.Lea;
    record.EditUicn = record.Uicn;
    record.EditDistEstacional = record.DistEstacional;
    record.EditDescripcion = record.Descripcion;
    record.EditEcologia = record.Ecologia;
    record.EditHabitat = record.Habitat;
    record.EditDistribucion = record.Distribucion;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['familia'] = recordRow.EditFamilia;
    record['orden'] = recordRow.EditOrden;
    record['especie'] = recordRow.EditEspecie;
    record['nombre'] = recordRow.EditNombre;
    record['cites'] = recordRow.EditCites;
    record['lea'] = recordRow.EditLea;
    record['uicn'] = recordRow.EditUicn;
    record['distEstacionl'] = recordRow.EditDistEstacional;
    record['descripcio '] = recordRow.EditDescripcion;
    record['ecologia'] = recordRow.EditEcologia;
    record['habitat'] = recordRow.EditHabitat;
    record['distribucion'] = recordRow.EditDistribucion;
    this.crudService.update_especie(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
