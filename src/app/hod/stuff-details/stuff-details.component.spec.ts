import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffDetailsComponent } from './stuff-details.component';

describe('StuffDetailsComponent', () => {
  let component: StuffDetailsComponent;
  let fixture: ComponentFixture<StuffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuffDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
