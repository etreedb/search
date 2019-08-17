import { Type } from 'class-transformer';
import { HalLink } from './hal-link';

export class HalLinks {
  @Type(() => HalLink)
  audit: HalLink;

  @Type(() => HalLink)
  self: HalLink;

  @Type(() => HalLink)
  pref: HalLink;

  @Type(() => HalLink)
  next: HalLink;

  @Type(() => HalLink)
  first: HalLink;

  @Type(() => HalLink)
  last: HalLink;

  @Type(() => HalLink)
  documentation: HalLink;
}
