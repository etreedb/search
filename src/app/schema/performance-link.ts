import { HalLinks } from './hal-links';
import { Performance } from './performance';

export class PerformanceLink {
  id: Number;
  name: String;
  url: String;
  _embedded: {
    performance: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
