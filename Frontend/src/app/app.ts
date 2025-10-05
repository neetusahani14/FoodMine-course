import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/partials/header/header';
import { Home } from './components/pages/home/home';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RouterModule, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
