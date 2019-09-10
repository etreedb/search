import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Rot13DecodePipe } from './pipe/rot13-decode.pipe';
import { LtGtPipe } from './pipe/lt-gt.pipe';
import { DateMaskPipe } from './pipe/date-mask.pipe';
import { TextareaToolsDirective } from './directive/textarea-tools.directive';
import { FileUploadTextDirective } from './directive/file-upload-text.directive';
import { ShowForRoleSourceDirective } from './directive/show-for-role-source.directive';
import { ShowForRoleAdminDirective } from './directive/show-for-role-admin.directive';
import { AutosizeDirective } from './directive/autosize.directive';

@NgModule({
  declarations: [
    Rot13DecodePipe,
    LtGtPipe,
    DateMaskPipe,
    TextareaToolsDirective,
    FileUploadTextDirective,
    AutosizeDirective,
    ShowForRoleSourceDirective,
    ShowForRoleAdminDirective,
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
    DateMaskPipe,
    TextareaToolsDirective,
    FileUploadTextDirective,
    AutosizeDirective,
    ShowForRoleSourceDirective,
    ShowForRoleAdminDirective,
  ]
})
export class SharedModule { }
