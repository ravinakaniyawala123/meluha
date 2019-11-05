import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectFormComponent } from './edit-subject-form.component';

describe('EditSubjectFormComponent', () => {
  let component: EditSubjectFormComponent;
  let fixture: ComponentFixture<EditSubjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
