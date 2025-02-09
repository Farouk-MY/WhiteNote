import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { ChatService } from '../services/chat/chat.service';
import { getAdditionalUserInfo } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal!: ModalController;
  @ViewChild('popover') popover!: PopoverController;
  segment = 'chats';
  open_new_chat = false;
  users!: Observable<any[]>
  chatRooms!: Observable<any[]>;
  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color:'dark'
  };
  //users = [
  //  {id: 1, name: 'NIkhil', photo: 'https://i.pravatar.cc/315'},
  //  {id: 2, name: 'XYZ', photo: 'https://i.pravatar.cc/325'},
  //];
  //chatRooms = [
  //  {id: 1, name: 'NIkhil', photo: 'https://i.pravatar.cc/315'},
  //  {id: 2, name: 'XYZ', photo: 'https://i.pravatar.cc/325'},
  //];
  

  constructor(
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRooms()
  }

  getRooms(){
    this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms;
    console.log('chatrooms: ',this.chatRooms)
  }

  async logout(){
    try{
      console.log('Logout');
      this.popover.dismiss();
      await this.chatService.auth.logout();
      this.router.navigateByUrl('/login', {replaceUrl: true});
      window.location.reload();
    }catch(e) {
      console.log(e)
    }
  }

  onSegmentChanged(event: any) {
    console.log(event);
    this.segment = event.detail.value;
  }

  newChat() {
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }

  getUsers(){
    this.chatService.getUsers();
    this.users = this.chatService.users;
  }

  onWillDismiss(event: any) {}

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  async startChat(item: any) {
    try{
      //this.global.showLeader();
      const room = await this.chatService.createChatRoom(item?.uid)
      console.log('room: ',room);
      this.cancel();
      const navData: NavigationExtras = {
        queryParams: {
          name: item?.name
        }
      };

      this.router.navigate(['/','home','chat',room?.id], navData);
      //this.global.hideLoader();
    }catch(e) {
      console.log(e)
      //this.global.hideLoader();
    }
  }

  getChat(item:any) {
    (item?.user).pipe(
      take(1)
    ).subscribe((user_data: any) =>{
      console.log('data: ',user_data);
      const navData: NavigationExtras = {
        queryParams: {
          name: user_data?.name
        }
      };
      this.router.navigate(['/', 'home', 'chat', item?.id], navData);
    });
  }

  getUser(user:any){
    return user;
  }


}