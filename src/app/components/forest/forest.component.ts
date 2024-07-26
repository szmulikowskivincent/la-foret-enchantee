import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css'],
})
export class ForestComponent implements OnInit {
  trees = Array(100).fill(0);

  constructor() {}

  ngOnInit(): void {}
}

