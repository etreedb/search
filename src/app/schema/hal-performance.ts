import { HalLinks } from './hal-links';
import { Performance } from './performance';

export class HalPerformance {
  _links: HalLinks;
  _embedded: {
      performance: Array<Performance>;
  };
  page: Number;
  page_count: Number;
  total_items: Number;
  page_size: Number;
}
