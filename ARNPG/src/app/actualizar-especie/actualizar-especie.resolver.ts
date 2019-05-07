import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { CrudespeciesService } from '../services/crudespecies.service';

@Injectable()
export class ActualizarEspecieResolver implements Resolve<any> {

  constructor(public crudService: CrudespeciesService,) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      let itemId = route.paramMap.get('id');
      this.crudService.getEspecie(itemId)
      .then(data => {
        data.id = itemId;
        resolve(data);
      }, err => {
        reject(err);
      })
    })
  }
}