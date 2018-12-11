import { Artist } from './artist';

export class HalArtist {
  _links: Array<string>;
  _embedded: {
      artist: Array<Artist>;
  };
  page: Number;
  page_count: Number;
}
