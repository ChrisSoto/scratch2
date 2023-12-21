import { Meta } from "src/app/shared/interface/meta.model";
import { BlockGroup } from "../../block-editor/models/block.model";

export interface PSystem extends Meta {
  name: string;
  description: string;
  parts: PPart[];
  categories?: PCategory[];
  parentId?: string; // this system is the child of another system
  systemId?: string;
  hasData?: boolean;
  isSubSystem?: boolean;
}

export interface PPart extends Meta {
  name: string;
  description: string;
  order: number;
  generatorIds?: string[];
  relations?: PRelation[];
  categories?: PCategory[];
  notes?: string;
}

export interface PData extends Meta {
  systemId: string;
  partId: string;
  patternId: string;
  parentId: string;
  order: number;
  depth: number;
  data: BlockGroup;
}

export interface PRelation extends Meta {
  name: string;
  description: string;
  relationType: PRelationType;
}

export interface PCategory extends Meta {
  name: string;
  description?: string;
  suffix?: string;
  categoryType: PCategoryType;
}

export enum EditStatus {
  NEW = 'New',
  REUSE = 'Re-use',
  EDIT = 'Edit',
}

export enum PRelationType {
  FORWARD = 'Forward',
  BACKWARD = 'Backward',
}

export enum PCategoryType {
  QUANTITY = 'Quantity',
  PLACE = 'Place',
  TIME = 'Time',
  CONDITION = 'Condition',
  COLOR = 'Color',
  IMAGE = 'Image',
}

// util

export type DialogStatus = 're-use' | 'create' | 'update' | 'delete' | 'cancel';

export interface DialogReturn<T> {
  status: DialogStatus;
  data: T | null;
}

export interface GeneratorIdName {
  id: string;
  name: string;
}