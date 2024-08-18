import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistePageRoutingModule } from './checkliste-routing.module';

import { ChecklistePage } from './checkliste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistePageRoutingModule
  ],
  declarations: [ChecklistePage]
})
export class ChecklistePageModule {}
