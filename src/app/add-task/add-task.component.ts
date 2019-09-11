import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../task-manager.service';
import { TaskDataModel } from "../task-data-model";
import Utils from '../utils';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {
  private taskDataModel = new TaskDataModel('', 0, '', '', '');
  successMsg = '';
  errMsg = '';

  constructor(private _taskManagerService: TaskManagerService) { }

  ngOnInit() {

  }

  addTask() {
    this._taskManagerService.addTask(this.taskDataModel).subscribe(
      data => {
        this.successMsg = data != null && data.value != '' ? data.value : 'Operation Successfull!';
        setTimeout(() => Utils.removeAlert('successAlert', this), 2000);
      },
      error => {
        this.errMsg = error.error != null ? error.error : error.statusText;
        setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
      }
    );
  }

}
