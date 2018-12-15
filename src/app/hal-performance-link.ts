import { PerformanceLink } from './performance-link';
import { HalLinks } from './hal-links';

export class HalPerformanceLink {
  _links: HalLinks;
  _embedded: {
      performance_link: Array<PerformanceLink>;
  };
  page: Number;
  page_count: Number;
}
