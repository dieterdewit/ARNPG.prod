import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ActualizarEspeciePage } from './actualizar-especie.page';

describe('ActualizarEspeciePage', () => {
  let component: ActualizarEspeciePage;
  let fixture: ComponentFixture<ActualizarEspeciePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarEspeciePage ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEspeciePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
