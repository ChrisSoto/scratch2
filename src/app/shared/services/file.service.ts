import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  urlCleanUp(url: string) {
    const pre = 'https://firebasestorage.googleapis.com/v0/b/scratch-projects-63c96.appspot.com/o/';
    const post = '?alt=media';
    const clean = url
      .replace('gs://scratch-projects-63c96.appspot.com/', '')
      .replace('/', '%2F')
      .replace(' ', '%20');
    return pre + clean + post;
  }
}
