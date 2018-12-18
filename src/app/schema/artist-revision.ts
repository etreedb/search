export class ArtistRevision {
  _id: Number;
  id: Number;
  name: String;
  icon: String;
  createdAt: String;
  abbreviation: String;
  isTradable: Boolean;
  description: String;
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
