import { Injectable, inject } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, uploadBytes, getDownloadURL, UploadTask, UploadResult } from "firebase/storage";
import { ActionStatusService } from './action-status.service';
import { BehaviorSubject } from 'rxjs';
import { FileService } from './file.service';

@Injectable()
export class FileUploadService {

  progress$: BehaviorSubject<number> = new BehaviorSubject(0);
  fileUrl$: BehaviorSubject<string> = new BehaviorSubject('');
  uploadResultData$: BehaviorSubject<UploadResult | null> = new BehaviorSubject<UploadResult | null>(null);

  private status = inject(ActionStatusService);
  private file = inject(FileService);
  private storage = getStorage();

  private uploadTask!: UploadTask;
  private uploadResult!: Promise<UploadResult>;

  uploadFile(directory: string, file: File, resumable?: boolean) {
    const fileRef = ref(this.storage, directory + '/' + file.name);
    if (resumable) {
      this.uploadTask = uploadBytesResumable(fileRef, file);
      this.uploadResumable();
    } else {
      this.uploadResult = uploadBytes(fileRef, file);
      this.upload();
    }
    return this.fileUrl$.asObservable();
  }

  uploadResumable() {
    this.uploadTask.on('state_changed',
      (snapshot) => {

        this.progress$.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            this.status.failure('Unauthorized to upload!');
            break;
          case 'storage/canceled':
            // User canceled the upload
            this.status.failure('User canceled upload!');
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            this.status.failure('Did not work!');
            break;
        }
        // complete
      }, () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(this.uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.fileUrl$.next(this.file.urlCleanUp(downloadURL));
        });
        this.progress$.next(0);
      });
  }

  upload() {
    this.uploadResult.then(result => {
      this.uploadResultData$.next(result);
      this.fileUrl$.next(this.file.urlCleanUp(result.ref.toString()));
    })
  }
}
