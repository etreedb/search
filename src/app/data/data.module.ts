import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistLinkService } from './service/artist-link.service';
import { ArtistService } from './service/artist.service';
import { EntityLinkService } from './service/entity-link.service';
import { FamilyExtendedService } from './service/family-extended.service';
import { FamilyService } from './service/family.service';
import { GraphqlService } from './service/graphql.service';
import { PerformanceLinkService } from './service/performance-link.service';
import { PerformanceService } from './service/performance.service';
import { SourceChecksumService } from './service/source-checksum.service';
import { SourceCommentService } from './service/source-comment.service';
import { SourceLinkService } from './service/source-link.service';
import { SourceService } from './service/source.service';
import { UserFeedbackService } from './service/user-feedback.service';
import { UserPerformanceService } from './service/user-performance.service';

@NgModule({
  declarations: [
/*
    ArtistLinkService,
    ArtistService,
    EntityLinkService,
    FamilyExtendedService,
    FamilyService,
    GraphqlService,
    PerformanceLinkService,
    PerformanceService,
    SourceChecksumService,
    SourceCommentService,
    SourceLinkService,
    SourceService,
    UserFeedbackService,
    UserPerformanceService
*/
  ],
  imports: [
    CommonModule
  ]
})
export class DataModule { }
