import { HalLinks } from './hal-links';
import { LinkInterface } from './link-interface';

export class ArtistLink implements LinkInterface {
  id: number;
  name: string;
  url: string;
  _embedded: {
    artist: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
