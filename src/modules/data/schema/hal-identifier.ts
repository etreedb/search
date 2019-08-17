import { HalLinks } from './hal-links';
import { Identifier } from './identifier';

export class HalIdentifier {
  _links: HalLinks;
  _embedded: {
      identifier: Array<Identifier>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
