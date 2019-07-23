import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvistamientosPage } from './avistamientos.page';

describe('AvistamientosPage', () => {
  let component: AvistamientosPage;
  let fixture: ComponentFixture<AvistamientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvistamientosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvistamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
