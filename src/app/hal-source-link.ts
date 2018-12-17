import { SourceLink } from './source-link';
import { HalLinks } from './hal-links';

export class HalSourceLink {
  _links: HalLinks;
  _embedded: {
      source_link: Array<SourceLink>;
  };
  page: Number;
  page_count: Number;
}
