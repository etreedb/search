import { HalLinks } from './hal-links';

export class SourceLink {
  id: number;
  name: string;
  url: string;
  _embedded: {
    source: {
      _links: HalLinks;
    }
  };
}
