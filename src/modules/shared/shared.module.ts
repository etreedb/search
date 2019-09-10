import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Rot13DecodePipe } from './pipe/rot13-decode.pipe';
import { LtGtPipe } from './pipe/lt-gt.pipe';
import { DateMaskPipe } from './pipe/date-mask.pipe';

@NgModule({
  declarations: [
    Rot13DecodePipe,
    LtGtPipe,
    DateMaskPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Rot13DecodePipe,
    LtGtPipe,
    DateMaskPipe
  ]
})
export class SharedModule { }
