import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../note/note.service';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  private _trash = new BehaviorSubject<Note[]>([]);

  get trash() {
    return this._trash.asObservable();
  }

  constructor() {
    // Load trash from local storage on service initialization
    const storedTrash = localStorage.getItem('trash');
    if (storedTrash) {
      this._trash.next(JSON.parse(storedTrash));
    }
  }

  private updateTrash(trash: Note[]) {
    // Update local storage whenever trash is updated
    localStorage.setItem('trash', JSON.stringify(trash));
  }

  async addToTrash(note: Note) {
    try {
      const currentTrash = this._trash.value;
      let trash: Note[] = [note, ...currentTrash];
      this._trash.next(trash);

      // Update local storage
      this.updateTrash(trash);
    } catch (e) {
      throw e;
    }
  }

  async removeFromTrash(note: Note) {
    try {
      let currentTrash = this._trash.value;

      // Check if note is not null or undefined and has an 'id' property
      if (note && note.id) {
        currentTrash = currentTrash.filter((x) => x && x.id !== note.id);
        this._trash.next([...currentTrash]);

        // Update local storage
        this.updateTrash(currentTrash);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
