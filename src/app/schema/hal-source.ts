import { HalLinks } from './hal-links';
import { Source } from './source';

export class HalSource {
  _links: HalLinks;
  _embedded: {
      source: Array<Source>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
