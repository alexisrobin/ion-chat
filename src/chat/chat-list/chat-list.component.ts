import { Component } from '@angular/core';

import { Nav } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';

import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ChatService } from '../chat.service';
import { NewChat } from '../new-chat/new-chat.component'
import { ChatDetail } from '../chat-detail/chat-detail.component'

import { UserProfile } from '../../user/user-profile/user-profile.component'

import { Chat } from '../chat';

@Component({
  templateUrl: 'chat-list.component.html'
})
export class ChatList {

  public userUid : string;
  public chats : Observable<Chat[]>

  constructor(private chatService: ChatService, private nav : Nav){}

  ngOnInit(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUid = firebase.auth().currentUser.uid;
        this.chats = this.chatService.getChatsByUser(this.userUid);
        console.log(this.chats);
      }
    });
  }

  newChat(){
      this.nav.push(NewChat);
  }

  goToChat(chatUid : string){
    this.nav.push(ChatDetail, {chatUid: chatUid});
  }

  goToUserProfile() {
    this.nav.push(UserProfile);
  }
}
