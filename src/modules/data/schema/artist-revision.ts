export class ArtistRevision {
  _id: number;
  id: number;
  name: string;
  icon: string;
  createdAt: string;
  abbreviation: string;
  isTradable: Boolean;
  description: string;
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
