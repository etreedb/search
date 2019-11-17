import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { ShnFlacArtist } from './shn-flac-artist';
import { Artist } from './artist';
import { Identifier } from './identifier';
import { Source } from './source';
import { Performance } from './performance';

export class ShnFlacTorrent {
  id: number;
  name: string;
  url: string;
  createdAt: Datetime;
  performanceDate: string;
  _embedded: {
    shnFlacArtist: ShnFlacArtist;
    internetArchiveIdentifier: Identifier;
    source: Source;
    performance: Performance;
  };
  _links: HalLinks;
}
