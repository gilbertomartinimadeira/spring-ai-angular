import { ChatService } from './../chat.service';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  selector: 'app-simple-chat',
  styleUrl: './simple-chat.scss',
  templateUrl: './simple-chat.html',
})
export class SimpleChat {

  @ViewChild("chatHistory")
  private chatHistory! : ElementRef;

  private chatService = inject(ChatService);

  userInput = '';

  isLoading = false;

  isLocal = true;

  messages = signal([
    { text: 'Hello, How can I help you today?', isBot: true}
  ]);

  onSendClick = () => {

    if( this.userInput !== '') {
      this.trimUserInput();
      this.updateMessages(this.userInput, false);
      this.isLoading = true;
      this.userInput = ``;
    }


    this.isLocal && this.simulateResponse();

    console.log('Input Received >> ' + this.userInput );


  };

  private trimUserInput() {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse() {
    setTimeout( () => {
      const response = 'This is a simulated response from CHAT AI';
      this.updateMessages( response, true);
      this.scrollToBottom();
      this.isLoading = false;
    },2000)
  }

  private updateMessages( text: string, isBot: boolean = false){
      this.messages.update(messages => [...messages, { text, isBot }]);
      this.scrollToBottom();
  }

  private scrollToBottom(){
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } finally {}
  }
}
