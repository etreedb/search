import { HalLinks } from './hal-links';
import { Performance } from './performance';

export class PerformanceLink {
  id: number;
  name: String;
  url: String;
  _embedded: {
    performance: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
