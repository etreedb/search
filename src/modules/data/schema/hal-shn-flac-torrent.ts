import { ShnFlacArtist } from './shn-flac-artist';
import { HalLinks } from './hal-links';
import { ShnFlacTorrent } from './shn-flac-torrent';

export class HalShnFlacTorrent {
  _links: HalLinks;
  _embedded: {
      torrent: Array<ShnFlacTorrent>;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
