import { Datetime } from './datetime';
import { HalLinks } from './hal-links';

export class IaCreator {
  id: number;
  name: string;
  _embedded: {
    identifier: {
      _links: HalLinks;
    },
  };
  _links: HalLinks;
}
