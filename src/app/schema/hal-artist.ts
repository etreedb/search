import { Artist } from './artist';
import { HalLinks } from './hal-links';

export class HalArtist {
  _links: HalLinks;
  _embedded: {
      artist: Array<Artist>;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
