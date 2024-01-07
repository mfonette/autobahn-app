import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autobahn-application';
  hamClick: any;
  isMenuOpen!: boolean;
  navLinks: any;


  toggleMenu() {
    this.hamClick = !this.hamClick;
    this.isMenuOpen = this.hamClick;
  }
}
