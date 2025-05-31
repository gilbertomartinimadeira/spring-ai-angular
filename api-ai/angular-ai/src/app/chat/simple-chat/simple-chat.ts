import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-simple-chat',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss'
})
export class SimpleChat {

  @ViewChild('chatHistory')
  private chatHistory!: ElementRef;

  userPrompt = 'bla bla bla';
  isLoading = false;


  messages = signal([
    {
      text: 'Hello, how can I help you today?',
      isBot: true
    }
  ]);

  onSendMessage() {

    this.trimUserPrompt();
    if (this.userPrompt !== '' && !this.isLoading) {
      this.updateMessages(this.userPrompt)
      this.userPrompt = '';
      this.simulateResponse();
    }

  }


  private trimUserPrompt() {
    this.userPrompt = this.userPrompt.trim();
  }

  private simulateResponse() {
    setTimeout(() => {
      const response = 'This is a simulated response from Chat AI';
      this.updateMessages(response, true);
      this.isLoading = false;
    }, 2000);

  }

  private updateMessages(text: string, isBot = false) {
    this.messages.update(messages => [...messages, { text: text, isBot: isBot }]);
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      const nEl = this.chatHistory.nativeElement;
      nEl.scrollTop = nEl.scrollHeight;
    } catch (error) {

    }
  }
}
