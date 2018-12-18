export class ArtistRevision {
  _id: number;
  id: number;
  name: String;
  icon: String;
  createdAt: String;
  abbreviation: String;
  isTradable: Boolean;
  description: String;
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
