import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEspeciesPage } from './gestionar-especies.page';

describe('GestionarEspeciesPage', () => {
  let component: GestionarEspeciesPage;
  let fixture: ComponentFixture<GestionarEspeciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarEspeciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarEspeciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
