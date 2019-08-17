import { HalLinks } from './hal-links';
import { Source } from './source';

export class SourceChecksum {
  id: number;
  name: string;
  description: string;
  _embedded: {
    source: Source
  };
  _links: HalLinks;
}
