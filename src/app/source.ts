import { Performance } from './performance';

export class Source {
    id: number;
    createdAt: string;
    circulationDate: string;
    shnDiscCount: number;
    wavDiscCount: number;
    description: string;
    summary: string;
    archiveIdentifier: string;
    lastUpdateAt: string;
    mediaSize: number;
    mediaSizeUncompressed: number;
    isApproved: boolean;
    _embedded: {
        performance: Performance;
    };
}
