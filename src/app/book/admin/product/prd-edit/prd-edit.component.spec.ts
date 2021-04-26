import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdEditComponent } from './prd-edit.component';

describe('PrdEditComponent', () => {
  let component: PrdEditComponent;
  let fixture: ComponentFixture<PrdEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrdEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
