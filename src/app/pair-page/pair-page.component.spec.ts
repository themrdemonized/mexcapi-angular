import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairPageComponent } from './pair-page.component';

describe('PairPageComponent', () => {
  let component: PairPageComponent;
  let fixture: ComponentFixture<PairPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PairPageComponent]
    });
    fixture = TestBed.createComponent(PairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
