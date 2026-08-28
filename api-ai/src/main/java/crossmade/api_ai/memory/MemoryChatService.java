package crossmade.api_ai.memory;

import org.springframework.stereotype.Service;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;

import crossmade.api_ai.chat.ChatMessage;

@Service
public class MemoryChatService {

    private final ChatClient chatClient;

    public MemoryChatService(ChatClient.Builder chatClientBuilder, ChatMemory memory) {
        this.chatClient = chatClientBuilder.defaultAdvisors(
                                            MessageChatMemoryAdvisor.builder(memory).build()
                                        ).build();
    }

    public ChatMessage simpleChat(String message) {
     
         var response = this.chatClient.prompt()
        .user(message)
        .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, "default"))
        .call()
        .content().toString();

        return new ChatMessage(response);
    }
}
