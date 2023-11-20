import { Observable } from "rxjs";

export interface BlockGroupEditor {
    newId:  () => Observable<string>;
    create: () => Observable<BlockGroup>;
    read:   () => Observable<BlockGroup>;
    update: () => Promise<void>;
    remove: () => Promise<void>;
}

export interface BlockGroup {
    title: string;
    blocks: Block[];
}

export interface Block {
    type: BlockTypes;
    data: string;
    order?: number;
}

export enum BlockTypes {
    TXT = 'text',
    IMG = 'image'
}