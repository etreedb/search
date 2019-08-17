import { HalLink } from './hal-link';

export class Role {
  id: Number;
  roleId: string;
  _embedded: {
      parent: Role;
      user: HalLink;
  };
}
