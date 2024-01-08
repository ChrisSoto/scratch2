import { Meta } from "src/app/shared/interface/meta.model";
import { Block, BlockGroup } from "../../block-editor/models/block.model";

export interface PSystem extends Meta {
  name: string;
  description: string;
  parts: PPart[];
  categories?: PCategory[];
  parentId?: string; // this system is the child of another system
  systemId?: string; // only on patterns
  hasData?: boolean;
  hasSiblings?: boolean;
  isSubSystem?: boolean;
}

export type PSystemType = 'Pattern' | 'System';

export interface PPart extends Meta {
  name: string;
  description: string;
  order: number;
  generatorIds?: string[];
  relations?: PRelation[];
  categories?: PCategory[];
  titleOnly?: boolean;
  notes?: string;
}

export interface PData extends Meta {
  systemId: string;
  partId: string;
  patternId: string;
  parentId: string;
  order: number;
  depth: number;
  generatorIds: string[];
  data: BlockGroup;
}

export interface PDataTree {
  id: string;
  self: PData;
  children: PData[];
  child: boolean;
  generator: boolean;
  showTextarea: boolean;
}

export interface PDataTree2 {
  id: string;
  self: PData;
  children: PDataTree2[];
  child: boolean;
  generator: boolean;
  showTextarea: boolean;
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

export interface PDataUpdate {
  block?: Block;
  index: number;
  data: PData;
  title?: string;
}

export enum PCodedData  {
  ONLY_TITLE = '[[ hide-textarea ]]'
};

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

export interface PPartCompare {
  newPart: PPart,
  oldPart: PPart,
}