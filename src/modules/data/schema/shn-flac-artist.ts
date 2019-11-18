import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { ShnFlacTorrent } from './shn-flac-torrent';
import { Artist } from './artist';

export class ShnFlacArtist {
  id: number;
  name: string;
  _embedded: {
    shnFlacTorrent: {
      _links: HalLinks;
    };
    artist: Artist;
  };
  _links: HalLinks;
}
