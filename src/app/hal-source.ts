import { Source } from './source';

export class HalSource {
  _links: Array<string>;
  _embedded: {
      source: Array<Source>;
  };
  page: Number;
  page_count: Number;
}
