import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  lang: string;

  constructor(public router: Router, private _taskManagerService: TaskManagerService) { }

  ngOnInit() {
    this.lang = this._taskManagerService.lang;
  }

  navbarOpen = false;
  title = 'Task Manager';

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  getLabel(labelKey: string) {
    return this._taskManagerService.getLabel(labelKey);
  }

  setLanguage($event) {
    this._taskManagerService.setLanguage($event.target.value);
  }

}
