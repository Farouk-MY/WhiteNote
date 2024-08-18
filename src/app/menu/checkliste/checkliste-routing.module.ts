import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistePage } from './checkliste.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistePageRoutingModule {}
