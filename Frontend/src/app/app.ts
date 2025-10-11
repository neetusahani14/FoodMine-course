import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/partials/header/header';
import { HttpClientModule } from '@angular/common/http';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RouterModule, NgbRatingModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
