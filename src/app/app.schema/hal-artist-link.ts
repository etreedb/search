import { ArtistLink } from './artist-link';
import { HalLinks } from './hal-links';

export class HalArtistLink {
  _links: HalLinks;
  _embedded: {
      artist_link: Array<ArtistLink>;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
