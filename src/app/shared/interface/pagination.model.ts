import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export interface PaginatedCollection<T> {
  data: T[],
  next: QueryDocumentSnapshot<T>,
  count: number
}

export interface SavedPages<T> {
  [page: number]: QueryDocumentSnapshot<T>;
}