import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  navbarOpen = false;
  title = 'Task Manager';

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
