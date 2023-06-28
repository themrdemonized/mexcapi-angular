import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'mexc-angular'`, () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mexc-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('mexc-angular app is running!');
  });
});
