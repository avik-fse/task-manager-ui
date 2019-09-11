import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TaskManagerService} from './task-manager.service';
import { UpdateTaskComponent } from './update-task/update-task.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    NavBarComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TaskManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
