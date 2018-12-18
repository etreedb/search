export class Revision {
  _id: number;
  id: number;
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
