export class SourceRevision {
    _id: number;
    id: number;
    circulationDate: string;
    shnDiscCount: number;
    wavDiscCount: number;
    description: string;
    summary: string;
    archiveIdentifier: string;
    mediaSize: number;
    mediaSizeUncompressed: number;
    isApproved: boolean;

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
