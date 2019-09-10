import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';
import { Type } from 'class-transformer';

export class ArtistGroup {
  id: number;
  title: string;
  header: string;
  footer: string;
  _embedded: {
    artist: {
      _links: HalLinks;
    };
    user: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
