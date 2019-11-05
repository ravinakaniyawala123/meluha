import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChapterFormComponent } from './edit-chapter-form.component';

describe('EditChapterFormComponent', () => {
  let component: EditChapterFormComponent;
  let fixture: ComponentFixture<EditChapterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChapterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChapterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
