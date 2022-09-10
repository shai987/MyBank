import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  doel?: string;
  sisma?: string;

  constructor(private router_srv: Router) {
    MenuComponent.setShouldAppered(false);
  }

  ngOnInit(): void {
  }

  logIn(): void {
    if (UserManager.validateUser(this.doel?.trim(), this.sisma?.trim())) {
      UserManager.userSignedIn();
      this.router_srv.navigateByUrl('/BankAccount');
    }
    else {
      alert("The Email or the Password or the combination is incorrect!");
    }
  }

}