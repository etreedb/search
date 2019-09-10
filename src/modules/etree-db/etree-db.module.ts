import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './component/artist/artist.component';
import { ArtistDetailComponent } from './component/artist-detail/artist-detail.component';
import { PerformanceDetailComponent } from './component/performance-detail/performance-detail.component';
import { PerformanceSearchComponent } from './component/performance-search/performance-search.component';
import { IndexComponent } from './component/index/index.component';
import { SourceDetailComponent } from './component/source-detail/source-detail.component';
import { SourceSearchComponent } from './component/source-search/source-search.component';
import { UserComponent } from './component/user/user.component';
import { UserHomeComponent } from './component/user-home/user-home.component';
import { ArtistLookupComponent } from './component-ui/artist-lookup/artist-lookup.component';
import { RouterModule } from '@angular/router';
import { ArtistCreateComponent } from './component/artist-create/artist-create.component';
import { PerformanceCreateComponent } from './component/performance-create/performance-create.component';
import { TextareaToolsDirective } from './directive/textarea-tools.directive';
import { SourceCreateComponent } from './component/source-create/source-create.component';
import { FileUploadTextDirective } from './directive/file-upload-text.directive';
import { PerformanceEditComponent } from './component/performance-edit/performance-edit.component';
import { AutosizeDirective } from './directive/autosize.directive';
import { SourceEditComponent } from './component/source-edit/source-edit.component';
import { ShowForRoleSourceDirective } from './directive/show-for-role-source.directive';
import { ShowForRoleAdminDirective } from './directive/show-for-role-admin.directive';
import { SearchPerformanceHeaderComponent } from './component-ui/header/search-performance-header/search-performance-header.component';
import { SearchSourceHeaderComponent } from './component-ui/header/search-source-header/search-source-header.component';
import { BrowseHeaderComponent } from './component-ui/header/browse-header/browse-header.component';
import { EtreeDbRoutingModule } from './etree-db-routing';
import { EtreeCollectionModule } from '@modules/etree-collection/etree-collection.module';
import { SharedModule } from '@modules/shared/shared.module';

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

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistDetailComponent,
    IndexComponent,
    PerformanceDetailComponent,
    PerformanceSearchComponent,
    SourceDetailComponent,
    SourceSearchComponent,
    UserComponent,
    UserHomeComponent,

    ArtistLookupComponent,
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
    ArtistCreateComponent,
    PerformanceCreateComponent,
    TextareaToolsDirective,
    SourceCreateComponent,
    FileUploadTextDirective,
    PerformanceEditComponent,
    AutosizeDirective,
    SourceEditComponent,
    ShowForRoleSourceDirective,
    ShowForRoleAdminDirective,
    SearchPerformanceHeaderComponent,
    SearchSourceHeaderComponent,
    BrowseHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    EtreeDbRoutingModule,
    EtreeCollectionModule,
    SharedModule,
  ],
  exports: [
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
  ],
})
export class EtreeDbModule { }
