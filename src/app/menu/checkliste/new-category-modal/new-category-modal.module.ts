import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCategoryModalPageRoutingModule } from './new-category-modal-routing.module';

import { NewCategoryModalPage } from './new-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCategoryModalPageRoutingModule
  ],
  declarations: [NewCategoryModalPage]
})
export class NewCategoryModalPageModule {}
