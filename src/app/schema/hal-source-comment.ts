import { HalLinks } from './hal-links';
import { SourceComment } from './source-comment';

export class HalSourceComment {
  _links: HalLinks;
  _embedded: {
      source_comment: Array<SourceComment>;
  };
  page: Number;
  page_count: Number;
  total_items: Number;
  page_size: Number;
}
