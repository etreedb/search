import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';

export class SourceComment {
    id: Number;
    createdAt: Datetime;
    postedBy: String;
    postedByEmail: String;
    description: String;
    _embedded: {
        source: {
            _links: HalLinks;
        };
        user: User;
    };
    _links: HalLinks;
}
