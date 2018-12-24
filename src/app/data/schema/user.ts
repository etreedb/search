import { HalLinks } from './hal-links';
import { Datetime } from './datetime';

export class User {
  id: number;
  name: String;
  username: String;
  email: String;
  rules: String;
  isActiveTrading: boolean;
  city: String;
  state: String;
  postalCode: String;
  description: String;
  createdAt: Datetime;
  lastUpdateAt: Datetime;
  _embedded: {
    performance: {
      links: HalLinks;
    }
    source: {
      _links: HalLinks;
    }
    sourceComment: {
      _links: HalLinks;
    }
    userFamily: {
      _links: HalLinks;
    }
    userFamilyExtended: {
      _links: HalLinks;
    }
    userFeedback: {
      _links: HalLinks;
    }
    userFeedbackPost: {
      _links: HalLinks;
    }
    userList: {
      _links: HalLinks;
    }
    userPerformance: {
      _links: HalLinks;
    }
    media: {
      _links: HalLinks;
    }
    userWantlist: {
      _links: HalLinks;
    }
    role: {
      _links: HalLinks;
    }
  };
  _links: HalLinks;
}
