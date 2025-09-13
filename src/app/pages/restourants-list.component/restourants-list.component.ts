import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restourants-list.component',
  imports: [],
  templateUrl: './restourants-list.component.html',
  styleUrl: './restourants-list.component.css'
})
export class RestourantsListComponent implements OnInit {
  ngOnInit(): void {
    console.log('RestourantListComponent');
  }

}
