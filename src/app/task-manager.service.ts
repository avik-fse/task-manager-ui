import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TaskDataModel } from "./task-data-model";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  _urlAddTask = "/api/taskManager/addTask";
  _urlGetAllTasks = "/api/taskManager/allTasks";
  _urlGetTaskById = "/api/taskManager/taskById";
  _urlEndTask = "/api/taskManager/endTask/";
  _urlUpdateTask = "/api/taskManager/updateTask";
  _urlI18nMessages = "/api/taskManager/i18nMessages";

  appMessages = new Map();
  headers =
    { 'Content-Type': 'application/json', 'Accept': '*/*', 'Access-Control-Allow-Origin': '*', 'Accept-Language': 'fr' }

  constructor(private http: HttpClient) { }

  initI18n() {

    return this.http.get<any>(this._urlI18nMessages, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler)).subscribe(
      data => {
        data.forEach(element => {
          this.appMessages.set(element.key, element.value);
        });

      }
    );

  }

  addTask(taskDataModel: TaskDataModel) {

    return this.http.post<any>(this._urlAddTask, taskDataModel, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler));
  }

  getAllTasks() {

    return this.http.get<any>(this._urlGetAllTasks, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler));
  }

  getTaskById(taskId: string) {

    return this.http.get<any>(this._urlGetTaskById + '/' + taskId, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  endTask(taskId: string) {
    const endTaskUrl = this._urlEndTask + '/' + taskId;
    return this.http.put<any>(endTaskUrl, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler));
  }

  updateTask(taskDataModel: TaskDataModel) {

    return this.http.put<any>(this._urlUpdateTask, taskDataModel, {
      headers: this.headers
    }).pipe(catchError(this.errorHandler));
  }

  getLabel(labelKey: string) {
    let label = '';
    switch(labelKey) {
      case 'label.task':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Task';
        }
        break;

      case 'label.priority':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Priority';
        }
        break;

      case 'label.parentTask':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Parent Task';
        }
        break;

      case 'label.startDate':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Start Date';
        }
        break;

      case 'label.endDate':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'End Date';
        }
        break;

      case 'label.addTask':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Add Task';
        }
        break;

      case 'label.reset':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Reset';
        }
        break;

      case 'label.priorityFrom':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Priority From';
        }
        break;

      case 'label.priorityTo':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Priority To';
        }
        break;

      case 'label.start':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Start';
        }
        break;

      case 'label.end':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'End';
        }
        break;

      case 'label.parent':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Parent';
        }
        break;

      case 'label.edit':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Edit';
        }
        break;

      case 'label.endTask':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'End Task';
        }
        break;

      case 'label.noTaskAvailable':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'No Task Available';
        }
        break;

      case 'label.updateTask':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Update Task';
        }
        break;

      case 'label.viewTask':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'View Task';
        }
        break;

      case 'label.title':
        label = this.appMessages.get(labelKey);
        if (label == undefined || label == null || label == '') {
          label = 'Task Manager';
        }
        break;
    }

    return label;
  }
}
