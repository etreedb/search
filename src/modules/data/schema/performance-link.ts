import { HalLinks } from './hal-links';
import { LinkInterface } from './link-interface';

export class PerformanceLink implements LinkInterface {
  id: number;
  name: string;
  url: string;
  _embedded: {
    performance: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
