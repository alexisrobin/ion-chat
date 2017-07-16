import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Chat } from '../models/Chat'
import { Message } from '../models/Message'
import { User } from '../models/User'

@Injectable()
export class ChatService {

    private chats : FirebaseListObservable<any>;
    private messages : FirebaseListObservable<any>;

    constructor(private afDb : AngularFireDatabase) {
        this.chats = this.afDb.list("chats");
    }

    getChat(chatUid : string){
        return this.afDb.object("chats/" + chatUid);
    }

    getChats(){
        return this.chats;
    }

    getMessages(chatUid : string){
        return this.afDb.list("messages/" + chatUid);
    }

    createChat(chat : Chat){
        return this.chats.push(chat);
    }

    createMessage(chatUid : string, message : Message){
        return this.afDb.list("messages/" + chatUid).push(message);
    }
}