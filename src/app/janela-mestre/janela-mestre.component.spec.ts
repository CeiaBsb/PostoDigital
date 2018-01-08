import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaMestreComponent } from './janela-mestre.component';

describe('JanelaMestreComponent', () => {
  let component: JanelaMestreComponent;
  let fixture: ComponentFixture<JanelaMestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanelaMestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JanelaMestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
