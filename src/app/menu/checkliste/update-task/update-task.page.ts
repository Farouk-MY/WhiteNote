import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../../services/todo/todo.service';
import { NewCategoryModalPage } from '../new-category-modal/new-category-modal.page';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {
  @Input() task: any;
  categories: string[] = [];
  categorySelectedCategory: any;

  newTaskObj = {};
  itemName: any;
  itemDueDate: any;
  itemPriority: any;
  itemCategory: any;

  constructor(
    public modalCtlr: ModalController,
    public todoServive: TodoService
  ) {}

  ngOnInit() {
    this.categories = ['work', 'personal'];
    this.itemName = this.task.value.itemName;
    this.itemDueDate = this.task.value.itemDueDate;
    this.itemPriority = this.task.value.itemPriority;
    this.categorySelectedCategory = this.task.value.itemCategory;
  }

  async dismis() {
    await this.modalCtlr.dismiss();
  }

  async update() {
    this.newTaskObj = {
      itemName: this.itemName,
      itemDueDate: this.itemDueDate,
      itemPriority: this.itemPriority,
      itemCategory: this.categorySelectedCategory,
    };
    let uid = this.task.key;
    await this.todoServive.updateTask(uid, this.newTaskObj);
    this.dismis();
  }

  async addNewCategory() {
    this.categories = this.categories || [];

    const modal = await this.modalCtlr.create({
      component: NewCategoryModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const newCategory = data.data.newCategory;
        if (newCategory && !this.categories.includes(newCategory.trim())) {
          this.categories.push(newCategory.trim());
          this.categorySelectedCategory = newCategory.trim();
          console.log('Categories after adding:', this.categories);
        }
      }
    });

    await modal.present();
  }
  selectCategory(category: string) {
    this.categorySelectedCategory = category;
    console.log('Selected Category:', this.categorySelectedCategory);
  }
}
