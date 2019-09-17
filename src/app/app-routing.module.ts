import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-task',
    pathMatch: 'full'
  },
  {
    path: 'add-task',
    component: AddTaskComponent
  },
  {
    path: 'view-task',
    component: ViewTaskComponent
  },
  {
    path: 'update-task/:taskId',
    component: UpdateTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
