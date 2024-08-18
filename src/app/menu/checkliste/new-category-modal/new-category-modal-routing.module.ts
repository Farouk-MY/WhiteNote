import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCategoryModalPage } from './new-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCategoryModalPageRoutingModule {}
