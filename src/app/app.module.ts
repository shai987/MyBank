import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListOfTransactionComponent } from './list-of-transactions/list-of-transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { EditBankBranchComponent } from './edit-bank-branch/edit-bank-branch.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountOwnerComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    MenuComponent,
    WelcomeComponent,
    ListOfTransactionComponent,
    TransactionDetailsComponent,
    EditBankBranchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
