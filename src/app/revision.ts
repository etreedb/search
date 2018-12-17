export class Revision {
    _id: number;
    id: number;
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
