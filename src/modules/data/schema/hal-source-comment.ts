import { HalLinks } from './hal-links';
import { SourceComment } from './source-comment';

export class HalSourceComment {
  _links: HalLinks;
  _embedded: {
      source_comment: Array<SourceComment>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
