import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreateGroupComponent } from './organization-create-group.component';

describe('OrganizationCreateGroupComponent', () => {
  let component: OrganizationCreateGroupComponent;
  let fixture: ComponentFixture<OrganizationCreateGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCreateGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
