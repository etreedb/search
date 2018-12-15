import { Performance } from './performance';

export class PerformanceLink {
    id: number;
    name: string;
    url: string;
    _embedded: {
        performance: Performance;
    };
}
