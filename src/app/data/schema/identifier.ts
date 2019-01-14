import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { Creator } from './creator';
import { Collection } from './collection';

export class Identifier {
  id: number;
  archiveIdentifier: string;
  performanceDate: string;
  addedAt: Datetime;
  title: string;
  uploader: string;
  venue: string;
  coverage: string;
  year: string;
  _embedded: {
    creator: Creator;
    collection: Collection[];
  };
  _links: HalLinks;
}
