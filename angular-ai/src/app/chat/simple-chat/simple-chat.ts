import { ChatService } from './../chat.service';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';


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

  isLocal = false;

  conversationId = "my_custom_conversation";

  messages = signal([
    { text: 'Hello, How can I help you today?', isBot: true}
  ]);

  onSendClick = () => {

    if( this.userInput !== '') {
      this.trimUserInput();
      this.updateMessages(this.userInput, false);
      this.isLoading = true;
    }


    this.isLocal ? this.simulateResponse() : this.sendChatMessage();


    console.log('Input Received >> ' + this.userInput );

    this.userInput = ``;
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

  private sendChatMessage() {
    console.log("ConversationID: " + this.conversationId);
    this.chatService.sendChatMessage(this.userInput, this.conversationId)
                    .pipe(
                      catchError( _ => {
                        this.updateMessages("Sorry I wasn`t able to send your message",true);
                        this.isLoading = false;
                        return throwError(() => {
                          new Error("An error happened during the message delivery")
                        })
                      })
                    )
                    .subscribe(response => {
      this.updateMessages(response.text, true);
      this.isLoading = false;
    });
  }
}
