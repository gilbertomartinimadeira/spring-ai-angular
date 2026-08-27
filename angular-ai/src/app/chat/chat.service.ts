import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ChatResponse } from './chat-response';
import { Observable } from 'rxjs';

@Service()
export class ChatService {
  private readonly API = '/api/chat';

  private httpClient = inject(HttpClient);

    sendChatMessage(message: String): Observable<ChatResponse> {
      return this.httpClient.post<ChatResponse>(this.API, {message});
    }
}
