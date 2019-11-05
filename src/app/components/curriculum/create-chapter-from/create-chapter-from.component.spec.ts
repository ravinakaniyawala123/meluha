import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChapterFromComponent } from './create-chapter-from.component';

describe('CreateChapterFromComponent', () => {
  let component: CreateChapterFromComponent;
  let fixture: ComponentFixture<CreateChapterFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChapterFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChapterFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
