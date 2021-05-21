import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HillComponent } from './hill.component';

describe('HillComponent', () => {
  let component: HillComponent;
  let fixture: ComponentFixture<HillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
