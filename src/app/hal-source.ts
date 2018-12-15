import { Source } from './source';
import { HalLinks } from './hal-links';

export class HalSource {
  _links: HalLinks;
  _embedded: {
      source: Array<Source>;
  };
  page: Number;
  page_count: Number;
}
