import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAvistamientosPage } from './mapa-avistamientos.page';

describe('MapaAvistamientosPage', () => {
  let component: MapaAvistamientosPage;
  let fixture: ComponentFixture<MapaAvistamientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaAvistamientosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaAvistamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
