import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../task-manager.service';
import Utils from '../utils';
import { TaskDataModel } from "../task-data-model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.sass']
})
export class ViewTaskComponent implements OnInit {
  private allTasks: TaskDataModel[];
  allFilteredTasks: TaskDataModel[];

  successMsg = '';
  errMsg = '';

  constructor(private _taskManagerService: TaskManagerService, private router: Router) { }

  ngOnInit() {
    this.getAllTask();
  }

  getAllTask() {
    this._taskManagerService.getAllTasks().subscribe(
      data => {
        this.allTasks = data;
        this.allFilteredTasks = data;
      },
      error => {
        this.errMsg = error.error != null ? error.error : error.statusText;
        setTimeout(() => Utils.removeAlert('errAlert', this), 2000);
      }
    );
  }

  matchByTask() {
    var task: string = <string>$('#inpTask').val();
    var parentTask: string = <string>$('#inpParentTask').val();
    var priorityFrom: string = <string>$('#inpPriorityFrom').val();
    var priorityTo: string = <string>$('#inpPriorityTo').val();
    var startDate: string = <string>$('#inpStartDate').val();
    var endDate: string = <string>$('#inpEndDate').val();

    var matchedTasks = [];

    this.allTasks.forEach(element => {
      var matched = true;
      if (task && task.length > 0) {
        if (element.task.toLowerCase().startsWith(task.toLowerCase())) {
          matched = true;
        } else {
          matched = false;
        }
      }

      if (matched && parentTask && parentTask.length > 0) {
        if (element.parentTask.toLowerCase().startsWith(parentTask.toLowerCase())) {
          matched = true;
        } else {
          matched = false;
        }
      }

      if (matched && priorityFrom && priorityFrom.length > 0 && priorityTo && priorityTo.length > 0) {

        if (!isNaN(priorityFrom as any) && !isNaN(priorityTo as any)) {
          var priorityFromNum = parseInt(priorityFrom);
          var priorityToNum = parseInt(priorityTo);

          if (priorityFromNum <= priorityToNum && element.priority >= priorityFromNum && element.priority <= priorityToNum) {
            matched = true;
          } else {
            matched = false;
          }
        }
      }

      if (matched && startDate && startDate.length > 0) {
        if (element.startDate && element.startDate.startsWith(startDate)) {
          matched = true;
        } else {
          matched = false;
        }
      }

      if (matched && endDate && endDate.length > 0) {
        if (element.endDate && element.endDate.startsWith(endDate)) {
          matched = true;
        } else {
          matched = false;
        }
      }

      if (matched) {
        matchedTasks.push(element);
      }

    });

    this.allFilteredTasks = matchedTasks;
  }

  endTask(taskId: string) {
    this._taskManagerService.endTask(taskId).subscribe(
      data => {
        //Refresh
        this.getAllTask();

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

  removeAlert(alertDivId: string, compRef: any) {
    Utils.removeAlert(alertDivId, compRef)
  }
}
