import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    console.log(`isProd: ${environment.production} \napi: ${environment.apiUrl} \nfilename: ${environment.fileName}`)
  }
  protected readonly title = signal('eats');


}
