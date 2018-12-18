import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { Performance } from './performance';
import { User } from './user';

export class Source {
  id: number;
  createdAt: Datetime;
  lastUpdateAt: Datetime;
  circulationDate: String;
  shnDiscCount: number;
  wavDiscCount: number;
  description: String;
  summary: String;
  archiveIdentifier: String;
  mediaSize: number;
  mediaSizeUncompressed: number;
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
