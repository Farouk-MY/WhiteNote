import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistePage } from './checkliste.page';

describe('ChecklistePage', () => {
  let component: ChecklistePage;
  let fixture: ComponentFixture<ChecklistePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChecklistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
