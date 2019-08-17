import { HalLinks } from './hal-links';
import { Creator } from './creator';

export class HalCreator {
  _links: HalLinks;
  _embedded: {
      creator: Array<Creator>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
