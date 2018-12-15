import { Artist } from './artist';
import { HalLinks } from './hal-links';

export class HalArtist {
  _links: HalLinks;
  _embedded: {
      artist: Array<Artist>;
  };
  page: Number;
  page_count: Number;
}
