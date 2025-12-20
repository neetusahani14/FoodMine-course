import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/partials/header/header';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingCom } from './components/partials/loading-com/loading-com';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RouterModule, NgbRatingModule,LoadingCom ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}

