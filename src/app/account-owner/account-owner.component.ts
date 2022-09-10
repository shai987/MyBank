import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from 'src/app/account-owner';
import { MenuComponent } from '../menu/menu.component';
import { UserManager } from '../user-manager';
import { showErrorFocus } from '../bank-account/bank-account.component';
const EDIT_OWENER = 'EDITOWNER';


@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  public owner: AccountOwner = new AccountOwner("Shai Geffen", "TLV", 123456789);
  private static ownerStatic: AccountOwner = new AccountOwner("Shai Geffen", "TLV", 123456789);
  edit: boolean = false;

  constructor(private router_srv: Router) {
    MenuComponent.setShouldAppered(true);
    this.owner = AccountOwnerComponent.getOwner();
  }


  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
  }

  static loadFill(): void {
    if (localStorage.getItem(EDIT_OWENER) == null) {
      localStorage.setItem(EDIT_OWENER, JSON.stringify(AccountOwnerComponent.ownerStatic));
    }
    else {
      try {
        let ownerKy: any = localStorage.getItem(EDIT_OWENER);
        AccountOwnerComponent.ownerStatic = JSON.parse(ownerKy);
      }
      catch (prblm: any) {
        localStorage.setItem(EDIT_OWENER, JSON.stringify(AccountOwnerComponent.ownerStatic));
        console.log("JSON problem: " + prblm.message);
      }
    }
  }

  //  Keeps in the local storage what it receives from the user
  public static setDetailsStatic(rrr: AccountOwner): void {
    localStorage.setItem(EDIT_OWENER, JSON.stringify(rrr));
  }

  // retrieves the name of the user 
  public static GETowenreName(): string {
    AccountOwnerComponent.loadFill();
    return AccountOwnerComponent.ownerStatic.name;
  }

  // retrieves the user's details 
  public static getOwner(): AccountOwner {
    AccountOwnerComponent.loadFill();
    return AccountOwnerComponent.ownerStatic;
  }

  public checkDetails(): boolean {
    let bool = true;
    if (this.owner.name.trim() === '') {
      showErrorFocus('You must enter a name', 'shem');
      bool = false;
    }
    if (this.owner.name.trim().length < 4) {
      showErrorFocus('You must enter a name with at least 4 characters', 'shem');
      bool = false;
    }
    if (this.owner.address.trim() === '') {
      showErrorFocus('You must enter a address', 'adrs');
      bool = false;
    }
    if (this.owner.address.trim().length < 2) {
      showErrorFocus('You must enter at least 2 characters', 'adrs');
      bool = false;
    }
    return bool;
  }

  // Apply to the static function 
  public setDetails(): void {
    if (this.checkDetails()) {
      this.edit = !this.edit;
      AccountOwnerComponent.setDetailsStatic(this.owner);
    }
  }
}
