export class PerformanceRevision {
  _id: number;
  id: number;
  performanceDate: string;
  venue: string;
  city: string;
  state: string;
  set1: string;
  set2: string;
  set3: string;
  description: string;
  year: number;
  revisionEntity: {
    revision: {
      createdAt: string;
      userId: number;
      userName: string;
    },
    revisionType: {
      name: string;
    },
    targetEntity: {
      name: string;
    }
  };
}
