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
import { AuditTableComponent } from './component-ui/audit-table/audit-table.component';
import { FamilyExtendedTableComponent } from './component-ui/family-extended-table/family-extended-table.component';
import { FamilyTableComponent } from './component-ui/family-table/family-table.component';
import { LinkTableComponent } from './component-ui/link-table/link-table.component';
import { PerformanceTableComponent } from './component-ui/performance-table/performance-table.component';
import { SourceChecksumTableComponent } from './component-ui/source-checksum-table/source-checksum-table.component';
import { SourceCommentTableComponent } from './component-ui/source-comment-table/source-comment-table.component';
import { SourceTableComponent } from './component-ui/source-table/source-table.component';
import { UserFeedbackTableComponent } from './component-ui/user-feedback-table/user-feedback-table.component';
import { UserPerformanceTableComponent } from './component-ui/user-performance-table/user-performance-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtistCreateComponent } from './component/artist-create/artist-create.component';
import { PerformanceCreateComponent } from './component/performance-create/performance-create.component';
import { DateMaskPipe } from './pipe/date-mask.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule
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
    DateMaskPipe
  ]
})
export class EtreeDbModule { }
