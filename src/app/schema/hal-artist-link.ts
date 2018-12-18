import { ArtistLink } from './artist-link';
import { HalLinks } from './hal-links';

export class HalArtistLink {
  _links: HalLinks;
  _embedded: {
      artist_link: Array<ArtistLink>;
  };
  page: Number;
  page_count: Number;
  page_size: Number;
  total_items: Number;
}
