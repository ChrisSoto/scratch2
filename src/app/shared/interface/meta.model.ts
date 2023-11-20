import { Timestamp } from '@angular/fire/firestore';

export interface Meta extends GenericMeta {
    id: string;
}

export interface GenericMeta {
    created?: Timestamp;
    createdBy?: string;
    updated?: Timestamp;
    updatedBy?: string;
}