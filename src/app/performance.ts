import { Artist } from './artist';
import { Source } from './source';

export class Performance {
    id: number;
    name: string;
    performanceDate: string;
    venue: string;
    city: string;
    state: string;
    set1: string;
    set2: string;
    set3: string;
    description: string;
    year: number;
    _embedded: {
        artist: Artist;
        source: any;
    };

    source: Array<Source>;
    toggle: boolean;
}
