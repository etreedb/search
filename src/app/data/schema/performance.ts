import { Artist } from './artist';
import { HalLinks } from './hal-links';

export class Performance {
  id: number;
  name: string;
  performanceDate: string;
  title: string;
  venue: string;
  city: string;
  state: string;
  set1: string;
  set2: string;
  set3: string;
  description: string;
  year: number;
  _embedded: {
    artist: Artist;
    source: {
      _links: HalLinks;
    };
    performanceLink: {
      _links: HalLinks;
    }
    performanceCorrection: {
      _links: HalLinks;
    }
    userPerformance: {
      _links: HalLinks;
    }
    wantlistUser: {
      _links: HalLinks;
    }
  };
  _links: HalLinks;
  _computed: {
    performanceCorrection: any;
  };
}
