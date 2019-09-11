import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardUserService } from '@app/authorization/auth-guard-user.service';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { UserComponent } from './component/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    canActivate: [AuthGuardUserService]
  },
  {
    path: ':username',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
