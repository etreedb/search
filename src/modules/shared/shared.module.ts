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
import { AuditTableComponent } from './component-ui/table/audit-table/audit-table.component';
import { FamilyExtendedTableComponent } from './component-ui/table/family-extended-table/family-extended-table.component';
import { FamilyTableComponent } from './component-ui/table/family-table/family-table.component';
import { LinkTableComponent } from './component-ui/table/link-table/link-table.component';
import { PerformanceTableComponent } from './component-ui/table/performance-table/performance-table.component';
import { SourceChecksumTableComponent } from './component-ui/table/source-checksum-table/source-checksum-table.component';
import { SourceCommentTableComponent } from './component-ui/table/source-comment-table/source-comment-table.component';
import { SourceTableComponent } from './component-ui/table/source-table/source-table.component';
import { UserFeedbackTableComponent } from './component-ui/table/user-feedback-table/user-feedback-table.component';
import { UserPerformanceTableComponent } from './component-ui/table/user-performance-table/user-performance-table.component';
import { IdentifierTableComponent } from './component-ui/table/identifier-table/identifier-table.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PerformanceImageTableComponent } from './component-ui/table/performance-image-table/performance-image-table.component';
import { ArtistTableComponent } from './component-ui/table/artist-table/artist-table.component';
import { ArtistLinkTableComponent } from './component-ui/table/artist-link-table/artist-link-table.component';
import { PerformanceLinkTableComponent } from './component-ui/table/performance-link-table/performance-link-table.component';
import { SourceLinkTableComponent } from './component-ui/table/source-link-table/source-link-table.component';

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
    AuditTableComponent,
    FamilyExtendedTableComponent,
    FamilyTableComponent,
    LinkTableComponent,
    PerformanceTableComponent,
    SourceChecksumTableComponent,
    SourceCommentTableComponent,
    SourceTableComponent,
    UserFeedbackTableComponent,
    UserPerformanceTableComponent,
    IdentifierTableComponent,
    PerformanceImageTableComponent,
    ArtistTableComponent,
    ArtistLinkTableComponent,
    PerformanceLinkTableComponent,
    SourceLinkTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CKEditorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CKEditorModule,
    Rot13DecodePipe,
    LtGtPipe,
    DateMaskPipe,
    TextareaToolsDirective,
    FileUploadTextDirective,
    AutosizeDirective,
    ShowForRoleSourceDirective,
    ShowForRoleAdminDirective,
    AuditTableComponent,
    FamilyExtendedTableComponent,
    FamilyTableComponent,
    IdentifierTableComponent,
    LinkTableComponent,
    PerformanceTableComponent,
    SourceChecksumTableComponent,
    SourceCommentTableComponent,
    SourceTableComponent,
    UserFeedbackTableComponent,
    UserPerformanceTableComponent,
    PerformanceImageTableComponent,
    ArtistTableComponent,
    ArtistLinkTableComponent,
    PerformanceLinkTableComponent,
    SourceLinkTableComponent
  ]
})
export class SharedModule { }
