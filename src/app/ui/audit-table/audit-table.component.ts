import { Component, Input } from '@angular/core';
import { ArtistService } from '../../app.service/artist.service';
import { SourceService } from '../../app.service/source.service';
import { PerformanceService } from '../../app.service/performance.service';
import { HalLink } from '../../app.schema/hal-link';

@Component({
  selector: 'app-audit-table',
  templateUrl: './audit-table.component.html',
  styleUrls: ['./audit-table.component.css']
})
export class AuditTableComponent {
  public collection: any;

  constructor(
    private artistService: ArtistService,
    private performanceService: PerformanceService,
    private sourceService: SourceService
  ) {
  }

  @Input() entityType: string;

  @Input()
  set halLink(halLink: HalLink) {
    switch (this.entityType) {
      case 'artist':
        this.artistService.audit(halLink)
          .subscribe(artistAudit => this.collection = artistAudit);
        break;
      case 'performance':
        this.performanceService.audit(halLink)
          .subscribe(performanceAudit => this.collection = performanceAudit);
        break;
      case 'source':
        this.sourceService.audit(halLink)
          .subscribe(sourceAudit => this.collection = sourceAudit);
        break;
    }
  }
}
