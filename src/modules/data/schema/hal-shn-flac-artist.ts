import { ShnFlacArtist } from './shn-flac-artist';
import { HalLinks } from './hal-links';

export class HalShnFlacArtist {
  _links: HalLinks;
  _embedded: {
      artist: Array<ShnFlacArtist>;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
