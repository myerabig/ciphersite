import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html',
  styleUrls: ['./hill.component.scss']
})
export class HillComponent implements OnInit {
  hillKeyword = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  handleHillKeyChange(): void {
    console.log('changed');
  }
}
