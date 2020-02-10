import { Component } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { SourceChecksumService } from '@modules/data/service/source-checksum.service';
import { HalSource } from '@modules/data/schema/hal-source';
import { SourceService } from '@modules/data/service/source.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public sourceSearch = 'id';
  public sourceSearchTerm: string;
  public sourceSearchResult: HalSource;

  constructor(
    private appComponent: AppComponent,
    private sourceChecksumService: SourceChecksumService,
    private sourceService: SourceService
   ) {
    this.appComponent.setTitle('search.etreedb.org');
   }

   public searchSource() {
    if (! this.sourceSearchTerm || ! this.sourceSearch) {
      return;
    }

    if (this.sourceSearch === 'id') {
      this.sourceSearchResult = null;

      const query = {
        filter: [
          {
            type: 'eq',
            field: 'id',
            value: this.sourceSearchTerm
          }
        ]
      };

      this.sourceService.findBy(query)
        .subscribe(searchResult => this.sourceSearchResult = searchResult);
    }

    if (this.sourceSearch === 'archiveIdentifier') {
      this.sourceSearchResult = null;

      const query = {
        filter: [
          {
            type: 'like',
            field: 'archiveIdentifier',
            value: '%' + this.sourceSearchTerm + '%'
          }
        ]
      };

      this.sourceService.findBy(query)
        .subscribe(searchResult => this.sourceSearchResult = searchResult);
    }

    if (this.sourceSearch === 'md5') {
      this.sourceSearchResult = null;
      this.sourceChecksumService.search(this.sourceSearchTerm)
        .subscribe(searchResult => this.sourceSearchResult = searchResult);
    }
  }
}
