import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './menu/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () => import('./menu/notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  },
  {
    path: 'checkliste',
    loadChildren: () => import('./menu/checkliste/checkliste.module').then( m => m.ChecklistePageModule)
  },
  {
    path: 'trash',
    loadChildren: () => import('./menu/trash/trash.module').then( m => m.TrashPageModule)
  },
  {
    path: 'add-new-task',
    loadChildren: () => import('./menu/checkliste/add-new-task/add-new-task.module').then( m => m.AddNewTaskPageModule)
  },
  {
    path: 'update-task',
    loadChildren: () => import('./menu/checkliste/update-task/update-task.module').then( m => m.UpdateTaskPageModule)
  },
  {
    path: 'new-category-modal',
    loadChildren: () => import('./menu/checkliste/new-category-modal/new-category-modal.module').then( m => m.NewCategoryModalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./menu/home/home.module').then( m => m.HomePageModule),
    canLoad : [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./menu/home/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./menu/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
