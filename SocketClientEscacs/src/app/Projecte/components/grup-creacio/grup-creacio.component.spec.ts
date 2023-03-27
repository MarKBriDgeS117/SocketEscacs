import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupCreacioComponent } from './grup-creacio.component';

describe('GrupCreacioComponent', () => {
  let component: GrupCreacioComponent;
  let fixture: ComponentFixture<GrupCreacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupCreacioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupCreacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
