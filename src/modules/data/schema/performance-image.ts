import { HalLinks } from './hal-links';
import { Performance } from './performance';
import { User } from './user';

export class PerformanceImage {
  id: number;
  description: string;
  path: string;
  createdAt: string;
  performance: Performance;
  user: User;
  _embedded: {
    source: {
      _links: HalLinks;
    }
  };
}
