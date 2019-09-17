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
  taskDataModel = new TaskDataModel('', 0, '', '', '', 0, 0, false);
  parentTaskMappingModel: TaskDataModel[];

  successMsg = '';
  errMsg = '';

  constructor(private _taskManagerService: TaskManagerService) {}

  ngOnInit() {
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

  removeAlert(alertDivId: string, compRef: any) {
    Utils.removeAlert(alertDivId, compRef)
  }

}
