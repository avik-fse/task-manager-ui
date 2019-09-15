import { Component, OnInit, Input } from '@angular/core';
import { TaskDataModel } from '../task-data-model';
import { TaskManagerService } from '../task-manager.service';
import { ActivatedRoute } from '@angular/router';
import Utils from '../utils';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.sass']
})
export class UpdateTaskComponent implements OnInit {
  private taskDataModel: TaskDataModel = new TaskDataModel('', 0, '', '', '');
  private taskDataModelPrestine: TaskDataModel;
  successMsg = '';
  errMsg = '';
  taskId = '';

  constructor(private _taskManagerService: TaskManagerService, private route: ActivatedRoute) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');

    this._taskManagerService.getTaskById(taskId).subscribe(
      data => {
        this.taskDataModel = data;
        this.taskDataModelPrestine = data;
      },
      error => {
        this.errMsg = error.error != null ? error.error : error.statusText;
        setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
      }
    );

  }

  updateTask() {
    this._taskManagerService.updateTask(this.taskDataModel).subscribe(
      data => {
        this.successMsg = data != null && data.value != '' ? data.value : 'Operation Successfull!';
        this.ngOnInit();
        setTimeout(() => Utils.removeAlert('successAlert', this), 2000);
      },
      error => {
        this.errMsg = error.error != null ? error.error : error.statusText;
        setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
      }
    );
  }

  cancelChanges() {
    this.taskDataModel = this.taskDataModelPrestine;
  }

  getLabel(labelKey: string) {
    return this._taskManagerService.getLabel(labelKey);
  }

}
