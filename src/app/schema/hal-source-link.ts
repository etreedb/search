import { HalLinks } from './hal-links';
import { SourceLink } from './source-link';

export class HalSourceLink {
  _links: HalLinks;
  _embedded: {
      source_link: Array<SourceLink>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
