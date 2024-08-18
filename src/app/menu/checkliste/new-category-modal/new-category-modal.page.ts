import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.page.html',
  styleUrls: ['./new-category-modal.page.scss'],
})
export class NewCategoryModalPage {
  newCategory: string = '';
  @Output() categoryAdded = new EventEmitter<string>();

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss({ newCategory: this.newCategory });
  }

  addCategory() {
    if (this.newCategory.trim() !== '') {
      this.categoryAdded.emit(this.newCategory.trim());
      this.newCategory = ''; // Reset the input field
      this.closeModal();
    }
  }
}
