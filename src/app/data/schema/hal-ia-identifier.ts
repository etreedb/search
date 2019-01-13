import { HalLinks } from './hal-links';
import { IaIdentifier } from './ia-identifier';

export class HalIaIdentifier {
  _links: HalLinks;
  _embedded: {
      identifier: Array<IaIdentifier>;
  };
  page: number;
  page_count: number;
  total_items: number;
  page_size: number;
}
