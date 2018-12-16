import { PerformanceLink } from './performance-link';

export class HalLink {
  _links: Array<string>;
  _embedded: {
      performanceLink: Array<PerformanceLink>;
  };
  page: Number;
  page_count: Number;
}
