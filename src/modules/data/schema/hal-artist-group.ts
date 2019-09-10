import { Artist } from './artist';
import { HalLinks } from './hal-links';
import { ArtistGroup } from './artist-group';

export class HalArtistGroup {
  _links: HalLinks;
  _embedded: {
      artist_group: Array<ArtistGroup>;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
