import { HalLinks } from './hal-links';
import { LinkInterface } from './link-interface';

export class SourceLink implements LinkInterface {
  id: number;
  name: string;
  url: string;
  _embedded: {
    source: {
      _links: HalLinks;
    }
  };
}
