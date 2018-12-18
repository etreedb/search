export class SourceRevision {
  _id: Number;
  id: Number;
  circulationDate: String;
  shnDiscCount: Number;
  wavDiscCount: Number;
  description: String;
  summary: String;
  archiveIdentifier: String;
  mediaSize: Number;
  mediaSizeUncompressed: Number;
  isApproved: boolean;
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
