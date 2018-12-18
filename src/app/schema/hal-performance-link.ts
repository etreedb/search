import { HalLinks } from './hal-links';
import { PerformanceLink } from './performance-link';

export class HalPerformanceLink {
  _links: HalLinks;
  _embedded: {
      performance_link: Array<PerformanceLink>;
  };
  page: Number;
  page_count: Number;
  total_items: Number;
  page_size: Number;
}
