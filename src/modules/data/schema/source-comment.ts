import { Datetime } from './datetime';
import { HalLinks } from './hal-links';
import { User } from './user';

export class SourceComment {
    id: number;
    createdAt: Datetime;
    postedBy: string;
    postedByEmail: string;
    description: string;
    _embedded: {
        source: {
            _links: HalLinks;
        };
        user: User;
    };
    _links: HalLinks;
}
