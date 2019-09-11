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

  constructor(private http: HttpClient) {}

  addTask(taskDataModel: TaskDataModel) {

    return this.http.post<any>(this._urlAddTask, taskDataModel, {
      headers:
        { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Access-Control-Allow-Origin': '*' }
    }).pipe(catchError(this.errorHandler));
  }

  getAllTasks() {

    return this.http.get<any>(this._urlGetAllTasks, {
      headers:
        { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Access-Control-Allow-Origin': '*' }
    }).pipe(catchError(this.errorHandler));
  }

  getTaskById(taskId: string) {

    return this.http.get<any>(this._urlGetTaskById + '/' + taskId, {
      headers:
        { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Access-Control-Allow-Origin': '*' }
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  endTask(taskId: string) {
    const endTaskUrl = this._urlEndTask + '/' + taskId;
    return this.http.put<any>(endTaskUrl, {
      headers:
        { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Access-Control-Allow-Origin': '*' }
    }).pipe(catchError(this.errorHandler));
  }

  updateTask(taskDataModel: TaskDataModel) {

    return this.http.put<any>(this._urlUpdateTask, taskDataModel, {
      headers:
        { 'Content-Type': 'application/json', 'Accept' : '*/*', 'Access-Control-Allow-Origin': '*' }
    }).pipe(catchError(this.errorHandler));
  }
}
