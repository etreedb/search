export class SourceRevision {
  _id: number;
  id: number;
  circulationDate: String;
  shnDiscCount: number;
  wavDiscCount: number;
  description: String;
  summary: String;
  archiveIdentifier: String;
  mediaSize: number;
  mediaSizeUncompressed: number;
  isApproved: boolean;
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
