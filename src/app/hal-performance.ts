import { Performance } from './performance';

export class HalPerformance {
  _links: Array<string>;
  _embedded: {
      performance: Array<Performance>;
  };
  page: Number;
  page_count: Number;
}
