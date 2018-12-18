import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';

export class Artist {
  id: number;
  name: String;
  abbreviation: String;
  createdAt: Datetime;
  description: String;
  icon: String;
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
