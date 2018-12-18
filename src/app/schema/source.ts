import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { Performance } from './performance';
import { User } from './user';

export class Source {
  id: Number;
  createdAt: Datetime;
  lastUpdateAt: Datetime;
  circulationDate: String;
  shnDiscCount: Number;
  wavDiscCount: Number;
  description: String;
  summary: String;
  archiveIdentifier: String;
  mediaSize: Number;
  mediaSizeUncompressed: Number;
  isApproved: Boolean;
  _embedded: {
    performance: Performance;
    user: User
    sourceChecksum: {
      _links: HalLinks;
    },
    sourceComment: {
      _links: HalLinks;
    },
    sourceLink: {
      _links: HalLinks;
    },
    userPerformance: {
      _links: HalLinks;
    }
  };
  _links: HalLinks;
}
