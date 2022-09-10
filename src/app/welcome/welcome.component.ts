import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() {
    MenuComponent.setShouldAppered(false);
  }

  ngOnInit(): void {
  }
}


