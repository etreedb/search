import { HalLinks } from './hal-links';
import { Performance } from './performance';

export class HalPerformance {
  _links: HalLinks;
  _embedded: {
      performance: Array<Performance>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
