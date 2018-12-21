import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SourceService } from '../../../data/service/source.service';
import { AppComponent } from '../../../app.component';
import { HalSource } from '../../../data/schema/hal-source';

@Component({
  selector: 'app-source-search',
  templateUrl: './source-search.component.html',
  styleUrls: ['./source-search.component.css']
})
export class SourceSearchComponent implements OnInit {
  public halSource: HalSource;
  searchTerm: string;
  showInstructions = true;

  constructor(
    private sourceService: SourceService,
    private location: Location,
    private route: ActivatedRoute,
    private appComponent: AppComponent
    ) {}

  search(term: string): void {
    if (! term) {
      return;
    }

    this.showInstructions = false;
    this.location.go('source/search', '?search=' + encodeURI(term));
    this.sourceService.search(term).subscribe(halSource => {
      this.halSource = halSource;

      this.appComponent.setTitle('Search Sources - ' + term);
    });
  }

  ngOnInit(): void {
    // This would print out the json object which contained
    // all of our query parameters for this particular route.
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params.search;

      if (this.searchTerm) {
        this.search(this.searchTerm);
      }
    });

    this.appComponent.setTitle('Search Sources');
  }
}
