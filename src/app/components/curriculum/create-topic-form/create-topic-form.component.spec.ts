import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicFormComponent } from './create-topic-form.component';

describe('CreateTopicFormComponent', () => {
  let component: CreateTopicFormComponent;
  let fixture: ComponentFixture<CreateTopicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTopicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
