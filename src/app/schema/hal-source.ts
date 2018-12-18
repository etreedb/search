import { HalLinks } from './hal-links';
import { Source } from './source';

export class HalSource {
  _links: HalLinks;
  _embedded: {
      source: Array<Source>;
  };
  page: Number;
  page_count: Number;
  total_items: Number;
  page_size: Number;
}
