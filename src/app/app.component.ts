import { Component } from '@angular/core';
import { TaskManagerService } from './task-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'task-manager';

  constructor(private _taskManagerService: TaskManagerService) {
    _taskManagerService.initI18n();
  }
}
