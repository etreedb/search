import { Component, Input, OnInit } from '@angular/core';
import { AbstractHalLinkTable } from '../abstract-hal-link-table';
import { IaIdentifierService } from 'src/app/data/service/ia-identifier.service';

@Component({
  selector: 'app-ia-identifier-table',
  templateUrl: './ia-identifier-table.component.html',
  styleUrls: ['./ia-identifier-table.component.css']
})
export class IaIdentifierTableComponent extends AbstractHalLinkTable implements OnInit {
  private isLoaded = false;

  @Input()
  creator: string;

  @Input()
  performanceDate: string;

  constructor(
    protected halService: IaIdentifierService
  ) {
    super();
  }

  ngOnInit() {
    this.flag$.subscribe( flagStatus => {
      if (flagStatus && ! this.isLoaded) {
        this.isLoaded = true;

        this.halService.findByCreatorAndPerformanceDate(this.creator, this.performanceDate)
        .subscribe(halResponse => this.halResponse = halResponse);
      }
    });
  }
}
