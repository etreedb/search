import { HalLinks } from './hal-links';
import { SourceChecksum } from './source-checksum';

export class HalSourceChecksum {
  _links: HalLinks;
  _embedded: {
      source_checksum: Array<SourceChecksum>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
