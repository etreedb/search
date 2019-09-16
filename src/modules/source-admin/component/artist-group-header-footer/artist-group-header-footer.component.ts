import { Component, OnInit } from '@angular/core';
import { ArtistGroupService } from '@modules/data/service/artist-group.service';
import { ArtistService } from '@modules/data/service/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistGroup } from '@modules/data/schema/artist-group';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Artist } from '@modules/data/schema/artist';

@Component({
  selector: 'app-artist-group-header-footer',
  templateUrl: './artist-group-header-footer.component.html',
  styleUrls: ['./artist-group-header-footer.component.css']
})
export class ArtistGroupHeaderFooterComponent implements OnInit {
  private artist: Artist;
  public artistGroup: ArtistGroup;
  public header = ClassicEditor;
  public footer = ClassicEditor;

  constructor(
    private artistGroupService: ArtistGroupService,
    private artistService: ArtistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.artistService.find(params.artist_id).subscribe(artist => {
        this.artist = artist;
        this.artistGroupService.findByUrl(artist._embedded.artistGroup._links.self.href)
          .subscribe(halArtistGroup => {
            this.artistGroup = halArtistGroup._embedded.artist_group[0];
          });
      });
    });
  }

  public onSubmit($event) {
    this.artistGroupService.patch(
      this.artistGroup.id, {
        header: this.artistGroup.header,
        footer: this.artistGroup.footer
    }).subscribe(artistGroup => {
      this.router.navigate(['/source-admin/index', this.artist.id]);
    });
  }
}
