import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { IaCreator } from './ia-creator';
import { IaCollection } from './ia-collection';

export class IaIdentifier {
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
    creator: IaCreator;
    collection: IaCollection[];
  };
  _links: HalLinks;
}
