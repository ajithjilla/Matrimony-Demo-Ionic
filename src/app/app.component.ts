import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '', icon: 'archive' },
    { title: 'My Matches', url: 'my-matches', icon: 'heart' },
    { title: 'Recommendations', url: 'daily-recommendations', icon: 'mail' }
  ];
  constructor() {}
}
