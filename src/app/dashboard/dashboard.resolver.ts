import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CrudespeciesService } from '../services/crudespecies.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {

  constructor(private crudService: CrudespeciesService) {}

  resolve() {
    return this.crudService.getEspecies();
  }
}