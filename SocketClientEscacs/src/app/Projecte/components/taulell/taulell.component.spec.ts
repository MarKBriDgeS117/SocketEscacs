import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulellComponent } from './taulell.component';

describe('TaulellComponent', () => {
  let component: TaulellComponent;
  let fixture: ComponentFixture<TaulellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaulellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaulellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
