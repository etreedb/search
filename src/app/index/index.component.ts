import { Component, OnInit } from '@angular/core';
import { ArtistLookupComponent } from '../ui/artist-lookup/artist-lookup.component';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
//    private artistLookupComponent: ArtistLookupComponent
   ) { }

  ngOnInit() {
//    this.artistLookupComponent.lookupArtist().subscribe(data => {
//        alert('lookup artisst hit');
//    });
  }


}
