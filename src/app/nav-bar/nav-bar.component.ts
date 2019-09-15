import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router, private _taskManagerService: TaskManagerService) { }

  ngOnInit() {
  }

  navbarOpen = false;
  title = 'Task Manager';

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  getLabel(labelKey: string) {
    return this._taskManagerService.getLabel(labelKey);
  }

}
