import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieUpdateDeleteComponent } from './movie-update-delete.component';

describe('MovieUpdateDeleteComponent', () => {
  let component: MovieUpdateDeleteComponent;
  let fixture: ComponentFixture<MovieUpdateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieUpdateDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieUpdateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
