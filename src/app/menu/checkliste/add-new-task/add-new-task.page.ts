import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from 'src/app/menu/services/todo/todo.service';
import { NewCategoryModalPage } from '../new-category-modal/new-category-modal.page';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage {
  categories: string[] = [];
  categorySelectedCategory: string = '';
  newTaskObj: any = {};
  itemName: string = '';
  itemDueDate: string = '';
  itemPriority: string = '';

  constructor(public modalCtrl: ModalController, public todoService: TodoService) {}

  async add() {
    this.newTaskObj = {
      itemName: this.itemName,
      itemDueDate: this.itemDueDate,
      itemPriority: this.itemPriority,
      itemCategory: this.categorySelectedCategory,
    };

    console.log('New Task:', this.newTaskObj);

    if (this.newTaskObj.itemName && this.newTaskObj.itemDueDate) {
      const uid = this.newTaskObj.itemName + this.newTaskObj.itemDueDate;

      await this.todoService.addTask(uid, this.newTaskObj);
      this.dismis();
    } else {
      console.log("Can't save empty task");
    }
  }

  async dismis() {
    await this.modalCtrl.dismiss(this.newTaskObj);
  }

  async addNewCategory() {
    const modal = await this.modalCtrl.create({
      component: NewCategoryModalPage,
    });

    modal.onDidDismiss().then((data) => {
      const newCategory = data?.data?.newCategory;
      if (newCategory && !this.categories.includes(newCategory.trim())) {
        this.categories.push(newCategory.trim());
        this.categorySelectedCategory = newCategory.trim();
        console.log('Categories after adding:', this.categories);
      }
    });

    modal.present();
  }

  selectCategory(category: string) {
    this.categorySelectedCategory = category;
    console.log('Selected Category:', this.categorySelectedCategory);
  }
}
