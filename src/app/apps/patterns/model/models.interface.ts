import { GenericMeta, Meta } from "src/app/shared/interface/meta.model";

export interface PSystem extends Meta {
  name: string;
  description: string;
  categories?: PCategory[];
  parts?: PPart[];
  parentId?: string; // this system is the child of another system
  systemId?: string;
}

export interface PPart extends Meta {
  name: string;
  description: string;
  relations?: PRelation[];
  categories?: PCategory[];
  generatorIds: string[];
  index?: number;
  notes?: string[]
}

export interface PNote extends Meta {
  systemId: string;
  partId: string;
}

export interface PRelation extends Meta {
  name: string;
  description: string;
  relation_type: PRelationType;
}

export interface PCategory extends Meta {
  name: string;
  description?: string;
  suffix?: string;
  category_type: PCategoryType;
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
  quantity = 'QUANTITY',
  place = 'PLACE',
  time = 'TIME',
  condition = 'CONDITION',
  color = 'COLOR',
  image = 'IMAGE',
}

// util

export type DialogDataStatus = 'update' | 'delete' | 'cancel';

export interface SystemDialogClose {
  status: DialogDataStatus;
  data?: PSystem | PPart;
}

export interface GeneratorIdName {
  id: string;
  name: string;
}