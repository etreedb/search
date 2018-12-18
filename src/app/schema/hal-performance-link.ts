import { HalLinks } from './hal-links';
import { PerformanceLink } from './performance-link';

export class HalPerformanceLink {
  _links: HalLinks;
  _embedded: {
      performance_link: Array<PerformanceLink>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
