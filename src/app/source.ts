import { Performance } from './performance';
import { HalLinks } from './hal-links';
import { Datetime } from './datetime';

export class Source {
    id: number;
    createdAt: Datetime;
    lastUpdateAt: Datetime;
    circulationDate: string;
    shnDiscCount: number;
    wavDiscCount: number;
    description: string;
    summary: string;
    archiveIdentifier: string;
    mediaSize: number;
    mediaSizeUncompressed: number;
    isApproved: boolean;
    _embedded: {
        performance: Performance;
        // user: User
        sourceChecksum: {
            _links: HalLinks;
        },
        sourceComment: {
            _links: HalLinks;
        },
        sourceLink: {
            _links: HalLinks;
        },
        userPerformance: {
            _links: HalLinks;
        }
    };
    _links: HalLinks;
}
