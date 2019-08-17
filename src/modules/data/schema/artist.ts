import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';
import { Type } from 'class-transformer';

export class Artist {
  constructor() {
   // alert('artist constructor');
  }

  id: number;
  name: string;
  abbreviation: string;
  officialUrl: string;
  createdAt: Datetime;
  description: string;
  icon: string;
  isTradable: Boolean;
  _embedded: {
    artistAlias: {
      _links: HalLinks;
    };
    artistLink: {
      _links: HalLinks;
    };
    performance: {
      _links: HalLinks;
    };
    artistGroup: {
      _links: HalLinks;
    };

    user: User;
    lastUser: User;
  };
  _links: HalLinks;
  _computed: {
      years: Array<number>;
  };
}
