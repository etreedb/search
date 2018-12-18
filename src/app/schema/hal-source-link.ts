import { HalLinks } from './hal-links';
import { SourceLink } from './source-link';

export class HalSourceLink {
  _links: HalLinks;
  _embedded: {
      source_link: Array<SourceLink>;
  };
  page: Number;
  page_count: Number;
  total_items: Number;
  page_size: Number;
}
