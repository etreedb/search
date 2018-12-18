import { HalLinks } from './hal-links';

export class SourceLink {
  id: Number;
  name: String;
  url: String;
  _embedded: {
    source: {
      _links: HalLinks;
    }
  };
}
