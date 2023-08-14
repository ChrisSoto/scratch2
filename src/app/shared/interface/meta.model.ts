import { Timestamp } from '@angular/fire/firestore';

export interface Meta {
    id: string;
    created?: Timestamp;
    createdBy?: string;
    updated?: Timestamp;
    updatedBy?: string;
}