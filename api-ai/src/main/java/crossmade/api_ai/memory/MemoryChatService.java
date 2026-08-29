package crossmade.api_ai.memory;

import org.springframework.stereotype.Service;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;

import crossmade.api_ai.chat.ChatMessage;

@Service
public class MemoryChatService {

    private final ChatClient chatClient;
    
    public MemoryChatService(ChatClient.Builder chatClientBuilder) {

        var chatMemory = MessageWindowChatMemory.builder()
                                                .maxMessages(2)
                                                .build();


        this.chatClient = chatClientBuilder.defaultAdvisors(
                                            MessageChatMemoryAdvisor                                            
                                            .builder(chatMemory).build(),
                                            new SimpleLoggerAdvisor()
                                        ).build();

        


    }

    public ChatMessage simpleChat(String message, String conversationId) {

        var id = conversationId == null ? "default" : conversationId;
        
         var response = this.chatClient
                            .prompt()
                            .user(message)
                            .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, id))
                            .call()
                            .content().toString();

        return new ChatMessage(response, conversationId);
    }
}
