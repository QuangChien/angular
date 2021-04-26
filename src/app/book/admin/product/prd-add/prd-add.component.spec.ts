import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdAddComponent } from './prd-add.component';

describe('PrdAddComponent', () => {
  let component: PrdAddComponent;
  let fixture: ComponentFixture<PrdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
