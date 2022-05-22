import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data = {
    description: 'Описание!!',
    codeBlock: [
      {
        title: "template.html",
        code: `${HomePageComponent}`
      },
      {
        title: "TypeScript",
        code: `${Component}`
      }
    ]
  };

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
