import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarAvistamientoPage } from './notificar-avistamiento.page';

describe('NotificarAvistamientoPage', () => {
  let component: NotificarAvistamientoPage;
  let fixture: ComponentFixture<NotificarAvistamientoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificarAvistamientoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificarAvistamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
