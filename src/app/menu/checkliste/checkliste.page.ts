import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from './add-new-task/add-new-task.page';
import { TodoService } from 'src/app/menu/services/todo/todo.service';
import { UpdateTaskPage } from './update-task/update-task.page';


@Component({
  selector: 'app-checkliste',
  templateUrl: './checkliste.page.html',
  styleUrls: ['./checkliste.page.scss'],
})
export class ChecklistePage{

  todoList:any[]=[]
  imagePath: string = '../../../assets/images/background.png';
  today : number = Date.now()

  constructor(public modalCtrl:ModalController, public todoService:TodoService) {
    this.getAllTask()
  }


  getItemPriorityColor(priority: string) {
    switch (priority) {
      case 'high':
        return 'red';
      case 'low':
        return 'green';
      default:
        return 'orange';
    }
  }
  
  getItemPriorityIcon(priority: string) {
    switch (priority) {
      case 'high':
        return 'ellipse';
      case 'low':
        return 'ellipse-outline';
      default:
        return 'ellipse';
    }
  }



  async addNewItem() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    })
    modal.onDidDismiss().then(newTask =>{
      this.getAllTask()
    })
    return await modal.present()
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTasks()
    console.log(this.todoService.getAllTasks());
  }

  delete(key:any) { 
    this.todoService.deleteTask(key)
    this.getAllTask()
  }

  async update(selectedTask:any){
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })
    
    return await modal.present()
  }

  setImagePath() {
    this.imagePath = '../../../assets/images/background.png';
  }
}