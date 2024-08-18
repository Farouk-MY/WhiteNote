import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrashService } from '../trash/trash.service';

export interface Note {
  toLowerCase(): unknown;
  title: string;
  description: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private _notes = new BehaviorSubject<Note[]>([]);

  get notes() {
    return this._notes.asObservable();
  }

  constructor(private trashService: TrashService) {
    // Load notes from local storage on service initialization
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this._notes.next(JSON.parse(storedNotes));
    }
  }

  private updateStorage(notes: Note[]) {
    // Update local storage whenever notes are updated
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  private updateNotes(notes: Note[]) {
    // Update the notes observable
    this._notes.next(notes);
    // Update local storage
    this.updateStorage(notes);
  }

  async addNote(data: Note) {
    try {
      const currentNotes = this._notes.value;
      let notes: Note[] = [{ ...data, id: (currentNotes.length + 1).toString() }];
      notes = notes.concat(currentNotes);
      this.updateNotes(notes);

      return notes;
    } catch (e) {
      throw e;
    }
  }

  async getNotes() {
    try {
      // This can be extended to fetch notes from an external API or other sources
      return this._notes.value;
    } catch (e) {
      throw e;
    }
  }

  async updateNote(id: string, data: Note) {
    try {
      let currentNotes = this._notes.value;
      const index = currentNotes.findIndex((x) => x.id == id);
      const latestData = { id, ...data };
      currentNotes[index] = latestData;
      this.updateNotes(currentNotes);

      return latestData;
    } catch (e) {
      throw e;
    }
  }

  async moveToTrash(note: Note) {
    try {
      let currentNotes = this._notes.value;
      const index = currentNotes.findIndex((x) => x.id === note.id);

      if (index !== -1) {
        const noteToMove = currentNotes[index];

        // Remove from current notes
        currentNotes.splice(index, 1);
        this.updateNotes(currentNotes);

        // Add to trash
        await this.trashService.addToTrash(noteToMove);
      }
    } catch (e) {
      throw e;
    }
  }
}
