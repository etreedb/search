import { HalLinks } from './hal-links';

export class SourceLink {
  id: number;
  name: String;
  url: String;
  _embedded: {
    source: {
      _links: HalLinks;
    }
  };
}
