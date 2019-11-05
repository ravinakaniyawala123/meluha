import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCreateBoardComponent } from './organization-create-board.component';

describe('OrganizationCreateBoardComponent', () => {
  let component: OrganizationCreateBoardComponent;
  let fixture: ComponentFixture<OrganizationCreateBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCreateBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
