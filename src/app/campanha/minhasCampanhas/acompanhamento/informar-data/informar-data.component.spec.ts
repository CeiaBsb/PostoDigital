/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformarDataComponent } from './informar-data.component';

describe('InformarDataComponent', () => {
  let component: InformarDataComponent;
  let fixture: ComponentFixture<InformarDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformarDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformarDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
