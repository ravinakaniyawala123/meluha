import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEditBoardComponent } from './organization-edit-board.component';

describe('OrganizationEditBoardComponent', () => {
  let component: OrganizationEditBoardComponent;
  let fixture: ComponentFixture<OrganizationEditBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEditBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEditBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
