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
  private taskDataModel: TaskDataModel = new TaskDataModel('', 0, '', '', '', 0, 0, false);
  private taskDataModelPrestine: TaskDataModel;
  private parentTaskMappingModel: TaskDataModel[];
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

        //Load all parent tasks and tasks to show in the parent task type ahead
        this._taskManagerService.allParentsAndActiveTasks().subscribe(
          data => {
            this.parentTaskMappingModel = data;
          },
          error => {
            this.errMsg = error.error != null ? error.error : error.statusText;
            setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
          }
        );
      },
      error => {
        this.errMsg = error.error != null ? error.error : error.statusText;
        setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
      }
    );

    this.disableKeypressOnParent();
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

  manageParentInput($event) {
    const parentTaskRec = $event.target.value;

    if (parentTaskRec != undefined) {
      const parentTaskParts = parentTaskRec.split(' | ');
      if (parentTaskParts.length == 3) {
        $event.target.value = parentTaskParts[2];

        //Set teh hidden fields
        this.taskDataModel.parentTask = parentTaskParts[2];
        this.taskDataModel.parentId = parseInt(parentTaskParts[1]);
        this.taskDataModel.isParentCollection = parentTaskParts[0] === 'PT' ? true : false;
      } else {
        this.taskDataModel.parentTask = parentTaskRec;
      }

    }

  }

  disableKeypressOnParent() {
    $('#parentTask').bind('keypress', function (e) {
      e.preventDefault();
    });

  }

}
