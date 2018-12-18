export class PerformanceRevision {
  _id: Number;
  id: Number;
  performanceDate: String;
  venue: String;
  city: String;
  state: String;
  set1: String;
  set2: String;
  set3: String;
  description: String;
  year: Number;
  revisionEntity: {
    revision: {
      createdAt: String;
      userId: Number;
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
