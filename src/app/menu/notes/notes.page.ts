import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonModal, IonSearchbar } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Note, NoteService } from '../services/note/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;
  noteSub!: Subscription;
  model: any = {};
  notes: Note[] = [];
  isOpen: boolean = false;
  imagePath: string = '../../../assets/images/background.png';
  searchTerm: string = '';
  filteredNotes: Note[] = [];

  constructor(private note: NoteService) {}

  ngOnInit(): void {
    this.note.getNotes();
    this.noteSub = this.note.notes.subscribe({
      next: (notes) => {
        this.notes = notes;
        this.filterNotes();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.model = {};
    this.isOpen = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async save(form: NgForm) {
    try {
      if (!form.valid) {
        // alert
        return;
      }
      console.log(form.value);
      if (this.model?.id) await this.note.updateNote(this.model.id, form.value);
      else await this.note.addNote(form.value);
      this.modal.dismiss();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteNote(note: Note) {
    try {
      // Move note to trash instead of directly deleting
      await this.note.moveToTrash(note);
    } catch (e) {
      console.log(e);
    }
  }

  async editNote(note: Note) {
    try {
      this.isOpen = true;
      this.model = { ...note };
    } catch (e) {
      console.log(e);
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterNotes();
  }

  filterNotes() {
    this.filteredNotes = this.notes.filter(
      (note) =>
        note.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    if (this.noteSub) this.noteSub.unsubscribe();
  }

  setImagePath() {
    this.imagePath = '../../../assets/images/background.png';
  }
}
