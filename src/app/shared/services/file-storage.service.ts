import { Injectable, inject } from '@angular/core';
import { getStorage, ref, list } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private storage = getStorage();

  listAll(folders?: string) {
    if (!folders) {
      folders = '';
    }
    // Create a reference under which you want to list
    const listRef = ref(this.storage, folders);

    // Find all the prefixes and items.
    list(listRef, { maxResults: 10 })
      .then((res) => {

        console.log(res);

        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });

        res.items.forEach((itemRef) => {
          // All the items under listRef.
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }
}
