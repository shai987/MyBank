import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager } from '../user-manager';
import { TransactionManager } from '../transaction-manager';
import { AccountOwnerComponent } from '../account-owner/account-owner.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  owner: string = AccountOwnerComponent.GETowenreName();
  currentBalance: number = TransactionManager.getBalance();

  private static shouldAppered: boolean = true;

  constructor(private router_srv: Router) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    UserManager.byeUser();
    this.router_srv.navigateByUrl('/AccountLogin');
  }

  getShouldAppered(): boolean {
    if (MenuComponent.shouldAppered) {
      this.owner = AccountOwnerComponent.GETowenreName();
      this.currentBalance = TransactionManager.getBalance();
    }
    return MenuComponent.shouldAppered;
  }

  static setShouldAppered(nwVlu: boolean): void {
    this.shouldAppered = nwVlu;
  }

}
