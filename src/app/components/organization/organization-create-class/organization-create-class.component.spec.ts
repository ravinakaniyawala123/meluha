import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreateClassComponent } from './organization-create-class.component';

describe('OrganizationCreateClassComponent', () => {
  let component: OrganizationCreateClassComponent;
  let fixture: ComponentFixture<OrganizationCreateClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCreateClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
