import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLugaresComponent } from './lista-lugares.component';

describe('ListaLugaresComponent', () => {
  let component: ListaLugaresComponent;
  let fixture: ComponentFixture<ListaLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLugaresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
