import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing';
import { UserComponent } from './component/user/user.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { EtreeDbModule } from '@modules/etree-db/etree-db.module';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
