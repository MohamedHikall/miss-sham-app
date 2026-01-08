import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from "./form-app/form-app";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('miss-sham-app');
}
