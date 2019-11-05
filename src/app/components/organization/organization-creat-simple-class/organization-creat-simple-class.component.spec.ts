import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreatSimpleClassComponent } from './organization-creat-simple-class.component';

describe('OrganizationCreatSimpleClassComponent', () => {
  let component: OrganizationCreatSimpleClassComponent;
  let fixture: ComponentFixture<OrganizationCreatSimpleClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCreatSimpleClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreatSimpleClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
