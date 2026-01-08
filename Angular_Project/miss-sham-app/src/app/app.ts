import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormApp } from "./form-app/form-app";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormApp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('miss-sham-app');
}
