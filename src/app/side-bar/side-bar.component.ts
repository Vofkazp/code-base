import {Component, OnInit} from '@angular/core';
import {ITEMS} from "./menu-item";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  menuItem = ITEMS;
  level1Menu = '';
  level2Menu = '';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currenturl = event.url.split('?')[0];
        const firstString = currenturl.split('/');
        this.level1Menu = firstString[1];
        this.level2Menu = firstString[2];
      }
    });
  }

  ngOnInit(): void {
  }

}
