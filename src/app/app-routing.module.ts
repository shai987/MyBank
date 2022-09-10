import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { ListOfTransactionComponent } from './list-of-transactions/list-of-transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditBankBranchComponent } from './edit-bank-branch/edit-bank-branch.component';

const routes: Routes = [
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: 'AccountOwner', component: AccountOwnerComponent },
  { path: 'ListOfTransaction', component: ListOfTransactionComponent },
  { path: 'EditBankBranch', component: EditBankBranchComponent },
  { path: 'Transaction/:count', component: TransactionDetailsComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
