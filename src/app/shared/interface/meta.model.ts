import { Timestamp } from '@angular/fire/firestore';

export interface Meta extends DateMeta {
    id: string;
}

export interface DateMeta {
    created?: Timestamp;
    createdBy?: string;
    updated?: Timestamp;
    updatedBy?: string;
}