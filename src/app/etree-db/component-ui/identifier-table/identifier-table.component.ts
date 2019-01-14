import { Component, Input, OnInit } from '@angular/core';
import { AbstractHalLinkTable } from '../../../etree-db/component-ui/abstract-hal-link-table';
import { IdentifierService } from 'src/app/data/service/identifier.service';

@Component({
  selector: 'app-identifier-table',
  templateUrl: './identifier-table.component.html',
  styleUrls: ['./identifier-table.component.css']
})
export class IdentifierTableComponent extends AbstractHalLinkTable implements OnInit {
  private isLoaded = false;

  @Input()
  creator?: string;

  @Input()
  performanceDate?: string;

  constructor(
    protected halService: IdentifierService
  ) {
    super();
  }

  ngOnInit() {
    this.flag$.subscribe( flagStatus => {
      if (flagStatus && ! this.isLoaded) {
        this.isLoaded = true;

        if (this.creator && this.performanceDate) {
          this.halService.findByCreatorAndPerformanceDate(this.creator, this.performanceDate)
            .subscribe(halResponse => this.halResponse = halResponse);
        }
      }
    });
  }
}
