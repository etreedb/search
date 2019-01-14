import { Datetime } from './datetime';
import { HalLinks } from './hal-links';

export class Collection {
  id: number;
  name: string;
  _embedded: {
    identifier: HalLinks;
  };
  _links: HalLinks;
}
