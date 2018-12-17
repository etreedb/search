import { HalLinks } from './hal-links';

export class ArtistLink {
    id: number;
    name: string;
    url: string;
    _embedded: {
        artist: {
            _links: HalLinks
        };
    };
}
