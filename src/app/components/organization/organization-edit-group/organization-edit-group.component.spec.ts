import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEditGroupComponent } from './organization-edit-group.component';

describe('OrganizationEditGroupComponent', () => {
  let component: OrganizationEditGroupComponent;
  let fixture: ComponentFixture<OrganizationEditGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEditGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
