import { HalLinks } from './hal-links';

export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    rules: string;
    isActiveTrading: boolean;
    city: string;
    state: string;
    postalCode: string;
    description: string;
    _embedded: {
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
