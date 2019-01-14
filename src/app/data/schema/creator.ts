import { Datetime } from './datetime';
import { HalLinks } from './hal-links';

export class Creator {
  id: number;
  name: string;
  _embedded: {
    identifier: {
      _links: HalLinks;
    },
  };
  _links: HalLinks;
  _computed: {
    years: number[];
  };
}
