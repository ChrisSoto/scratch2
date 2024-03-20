import { Injectable, inject } from '@angular/core';
import { getStorage, ref, list } from "firebase/storage";
import { FileService } from './file.service';

export interface ImagePacket {
  urls: string[];
  nextPageToken: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private storage = getStorage();
  private file = inject(FileService);

  listAll(directory?: string): Promise<ImagePacket> {
    if (!directory) {
      directory = '';
    }
    console.log(directory)
    // Create a reference under which you want to list
    const listRef = ref(this.storage, directory);

    // Find all the prefixes and items.
    return list(listRef, { maxResults: 10 })
      .then((res) => {

        const packet: ImagePacket = {
          urls: [],
          nextPageToken: null,
        };

        res.items.forEach((folderRef) => {
          let path = 'gs://' + folderRef.bucket + '/' + folderRef.fullPath;
          path = this.file.urlCleanUp(path);
          packet.urls.push(path);
        });

        if (res.nextPageToken) {
          packet.nextPageToken = res.nextPageToken;
        }

        return packet;
      }).catch((error) => {
        throw error;
      });
  }
}
