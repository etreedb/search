import { HalLinks } from './hal-links';

export class ArtistLink {
  id: Number;
  name: String;
  url: String;
  _embedded: {
    artist: {
      _links: HalLinks;
    };
  };
  _links: HalLinks;
}
