export class PerformanceRevision {
  _id: number;
  id: number;
  performanceDate: String;
  venue: String;
  city: String;
  state: String;
  set1: String;
  set2: String;
  set3: String;
  description: String;
  year: number;
  revisionEntity: {
    revision: {
      createdAt: String;
      userId: number;
      userName: String;
    },
    revisionType: {
      name: String;
    },
    targetEntity: {
      name: String;
    }
  };
}
