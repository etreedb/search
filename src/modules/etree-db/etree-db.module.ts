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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistCreateComponent } from './component/artist-create/artist-create.component';
import { PerformanceCreateComponent } from './component/performance-create/performance-create.component';
import { DateMaskPipe } from './pipe/date-mask.pipe';
import { TextareaToolsDirective } from './directive/textarea-tools.directive';
import { SourceCreateComponent } from './component/source-create/source-create.component';
import { FileUploadTextDirective } from './directive/file-upload-text.directive';
import { PerformanceEditComponent } from './component/performance-edit/performance-edit.component';
import { AutosizeDirective } from './directive/autosize.directive';
import { SourceEditComponent } from './component/source-edit/source-edit.component';
import { Rot13DecodePipe } from './pipe/rot13-decode.pipe';
import { ShowForRoleSourceDirective } from './directive/show-for-role-source.directive';
import { ShowForRoleAdminDirective } from './directive/show-for-role-admin.directive';
import { LtGtPipe } from './pipe/lt-gt.pipe';
import { EtreeCollectionComponent } from './component/etree-collection/etree-collection.component';
import { IdentifierTableComponent } from './component-ui/table/identifier-table/identifier-table.component';
import { CreatorDetailComponent } from './component/creator-detail/creator-detail.component';
import { EtreeCollectionHeaderComponent } from './component-ui/header/etree-collection-header/etree-collection-header.component';
import { SearchPerformanceHeaderComponent } from './component-ui/header/search-performance-header/search-performance-header.component';
import { SearchSourceHeaderComponent } from './component-ui/header/search-source-header/search-source-header.component';
import { BrowseHeaderComponent } from './component-ui/header/browse-header/browse-header.component';
import { EtreeDbRoutingModule } from './etree-db-routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    EtreeDbRoutingModule
  ],
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
    DateMaskPipe,
    TextareaToolsDirective,
    SourceCreateComponent,
    FileUploadTextDirective,
    PerformanceEditComponent,
    AutosizeDirective,
    SourceEditComponent,
    Rot13DecodePipe,
    ShowForRoleSourceDirective,
    ShowForRoleAdminDirective,
    LtGtPipe,
    EtreeCollectionComponent,
    IdentifierTableComponent,
    CreatorDetailComponent,
    EtreeCollectionHeaderComponent,
    SearchPerformanceHeaderComponent,
    SearchSourceHeaderComponent,
    BrowseHeaderComponent,
  ]
})
export class EtreeDbModule { }
