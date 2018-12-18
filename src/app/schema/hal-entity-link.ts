/**
 * This handles links genericly since all link entities have the same
 * structure.
 * This handles Artist, Performance, Source Link entities.
 */

import { HalLinks } from './hal-links';
import { ArtistLink } from './artist-link';
import { PerformanceLink } from './performance-link';
import { SourceLink } from './source-link';

export class HalEntityLink {
  _links: HalLinks;
  _embedded: {
    artist_link: ArtistLink;
    performance_link: PerformanceLink;
    source_link: SourceLink;
  };
  page: number;
  page_count: number;
  page_size: number;
  total_items: number;
}
