export class Revision {
  _id: Number;
  id: Number;
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
