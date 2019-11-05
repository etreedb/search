import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './component/artist/artist.component';
import { ArtistDetailComponent } from './component/artist-detail/artist-detail.component';
import { PerformanceDetailComponent } from './component/performance-detail/performance-detail.component';
import { PerformanceSearchComponent } from './component/performance-search/performance-search.component';
import { IndexComponent } from './component/index/index.component';
import { SourceDetailComponent } from './component/source-detail/source-detail.component';
import { SourceSearchComponent } from './component/source-search/source-search.component';
import { ArtistLookupComponent } from './component-ui/artist-lookup/artist-lookup.component';
import { RouterModule } from '@angular/router';
import { ArtistCreateComponent } from './component/artist-create/artist-create.component';
import { PerformanceCreateComponent } from './component/performance-create/performance-create.component';
import { SourceCreateComponent } from './component/source-create/source-create.component';
import { PerformanceEditComponent } from './component/performance-edit/performance-edit.component';
import { SourceEditComponent } from './component/source-edit/source-edit.component';
import { SearchPerformanceHeaderComponent } from './component-ui/header/search-performance-header/search-performance-header.component';
import { SearchSourceHeaderComponent } from './component-ui/header/search-source-header/search-source-header.component';
import { BrowseHeaderComponent } from './component-ui/header/browse-header/browse-header.component';
import { EtreeDbRoutingModule } from './etree-db-routing';
import { EtreeCollectionModule } from '@modules/etree-collection/etree-collection.module';
import { SharedModule } from '@modules/shared/shared.module';
import { UserModule } from '@modules/user/user.module';
import { PerformanceImageCreateComponent } from './component/performance-image-create/performance-image-create.component';
import { ArtistLinkCreateComponent } from './component/artist-link-create/artist-link-create.component';
import { PerformanceLinkCreateComponent } from './component/performance-link-create/performance-link-create.component';
import { SourceLinkCreateComponent } from './component/source-link-create/source-link-create.component';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistDetailComponent,
    IndexComponent,
    PerformanceDetailComponent,
    PerformanceSearchComponent,
    SourceDetailComponent,
    SourceSearchComponent,

    ArtistLookupComponent,
    ArtistCreateComponent,
    PerformanceCreateComponent,
    SourceCreateComponent,
    PerformanceEditComponent,
    SourceEditComponent,
    SearchPerformanceHeaderComponent,
    SearchSourceHeaderComponent,
    BrowseHeaderComponent,
    PerformanceImageCreateComponent,
    ArtistLinkCreateComponent,
    PerformanceLinkCreateComponent,
    SourceLinkCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    EtreeDbRoutingModule,
    EtreeCollectionModule,
    SharedModule,
    UserModule
  ]
})
export class EtreeDbModule { }
