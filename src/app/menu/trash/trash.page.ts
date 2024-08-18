import { Component, OnInit } from '@angular/core';
import { TrashService } from '../services/trash/trash.service';
import { Note } from '../services/note/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.page.html',
  styleUrls: ['./trash.page.scss'],
})
export class TrashPage implements OnInit {
  imagePath: string = '../../../assets/images/background.png';
  trashNotes: Note[] = [];

  constructor(private trashService: TrashService) {}

  ngOnInit() {
    this.trashService.trash.subscribe({
      next: (trash) => {
        this.trashNotes = trash;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  setImagePath() {
    this.imagePath = '../../../assets/images/background.png';
  }

  async deleteFromTrash(note: Note) {
    try {
      await this.trashService.removeFromTrash(note);
    } catch (e) {
      console.log(e);
    }
  }
  
}
