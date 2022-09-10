import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountDetails } from '../bank-account-details';
import { MenuComponent } from '../menu/menu.component';
import { UserManager } from '../user-manager';
import { showErrorFocus } from '../bank-account/bank-account.component';
const EDIT_BRANCH = 'EDITBRANCH';

@Component({
  selector: 'app-edit-bank-branch',
  templateUrl: './edit-bank-branch.component.html',
  styleUrls: ['./edit-bank-branch.component.css']
})
export class EditBankBranchComponent implements OnInit {
  public editBank: BankAccountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  private static editBankS: BankAccountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  edit: boolean = false;

  constructor(private router_srv: Router) {
    MenuComponent.setShouldAppered(true);
    this.editBank = new BankAccountDetails("Rimonim Givataim", 762, 113344);
    EditBankBranchComponent.loadFill();
    this.editBank = new BankAccountDetails(EditBankBranchComponent.editBankS.branchName, EditBankBranchComponent.editBankS.branchNumber, EditBankBranchComponent.editBankS.accountNumber);
  }

  ngOnInit(): void {
    if (!UserManager.isUserSignedIn()) {
      this.router_srv.navigateByUrl('/AccountLogin');
    }
  }

  static loadFill(): void {
    if (localStorage.getItem(EDIT_BRANCH) == null) {
      localStorage.setItem(EDIT_BRANCH, JSON.stringify(EditBankBranchComponent.editBankS));
    }
    else {
      try {
        let branchKy: any = localStorage.getItem(EDIT_BRANCH);
        EditBankBranchComponent.editBankS = JSON.parse(branchKy);
      }
      catch (prblm: any) {
        localStorage.setItem(EDIT_BRANCH, JSON.stringify(EditBankBranchComponent.editBankS));
        console.log("JSON problem: " + prblm.message);
      }
    }
  }
  public checkDetails(): boolean {
    let bool = true;
    if (this.editBank.branchName.trim() === '') {
      showErrorFocus('You must enter a branch name', 'branchName');
      bool = false;
    }
    if (this.editBank.branchName.trim().length < 4) {
      showErrorFocus('You must enter a bank name with at least 4 characters', 'branchName');
      bool = false;
    }
    if (this.editBank.branchNumber.toString().trim().length != 3) {
      showErrorFocus('You must enter a branch number with at least 3 digits', 'branchNumber');
      bool = false;
    }
    if (this.editBank.branchNumber < 1) {
      showErrorFocus('You must enter a branch number which is greater than zero', 'branchNumber');
      bool = false;
    }
    if (isNaN(this.editBank.branchNumber)) {
      showErrorFocus('You must enter digits', 'branchName');
      bool = false;
    }
    return bool;
  }
  static getBankAccountDetails(): BankAccountDetails {
    return EditBankBranchComponent.editBankS;
  }

  public setDetails(rrr: BankAccountDetails): void {
    if (this.checkDetails()) {
      this.edit = !this.edit;
      EditBankBranchComponent.editBankS = rrr;
      localStorage.setItem(EDIT_BRANCH, JSON.stringify(EditBankBranchComponent.editBankS));
    }
  }
}


