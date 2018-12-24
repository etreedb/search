import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/data/service/artist.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/data/schema/artist';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-performance-create',
  templateUrl: './performance-create.component.html',
  styleUrls: ['./performance-create.component.css']
})
export class PerformanceCreateComponent implements OnInit {
  public artist: Artist;
  public performanceForm: FormGroup;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => this.artistService.find(queryParams.artist_id)
          .subscribe( artist => this.artist = artist)
    );

    this.performanceForm = this.formBuilder.group({
      performanceDate: '',
      venue: '',
      city: '',
      state: '',
      set1: '',
      set2: '',
      set3: '',
      description: '',
      title: ''
    });
  }
}
