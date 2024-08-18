import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCategoryModalPage } from './new-category-modal.page';

describe('NewCategoryModalPage', () => {
  let component: NewCategoryModalPage;
  let fixture: ComponentFixture<NewCategoryModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
