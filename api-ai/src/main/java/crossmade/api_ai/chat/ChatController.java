package crossmade.api_ai.chat;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
@RestController
@RequestMapping("/api/chat")
public class ChatController {

     private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @PostMapping
    ChatMessage simpleChatResponse(@RequestBody ChatMessage message) {
        var response = this.chatClient.prompt()
            .user(message.text())
            .call()
            .content().toString();
        return new ChatMessage(response);
    }
}
