import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeciePage } from './especie.page';

describe('EspeciePage', () => {
  let component: EspeciePage;
  let fixture: ComponentFixture<EspeciePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspeciePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspeciePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
