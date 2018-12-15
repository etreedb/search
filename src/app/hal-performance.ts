import { Performance } from './performance';
import { HalLinks } from './hal-links';

export class HalPerformance {
  _links: HalLinks;
  _embedded: {
      performance: Array<Performance>;
  };
  page: Number;
  page_count: Number;
}
