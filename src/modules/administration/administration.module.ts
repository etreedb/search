import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { AdministrationRoutingModule } from './administration-routing';
import { SharedModule } from '@modules/shared/shared.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AdministrationModule { }
