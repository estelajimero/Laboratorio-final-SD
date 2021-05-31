import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinMaterialComponent } from './sin-material.component';

describe('SinMaterialComponent', () => {
  let component: SinMaterialComponent;
  let fixture: ComponentFixture<SinMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
