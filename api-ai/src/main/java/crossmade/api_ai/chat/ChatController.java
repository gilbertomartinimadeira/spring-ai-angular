package crossmade.api_ai.chat;

import crossmade.api_ai.memory.MemoryChatService;
import crossmade.api_ai.chat.ChatMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final MemoryChatService memoryChatService;

    public ChatController(MemoryChatService memoryChatService) {
        this.memoryChatService = memoryChatService;
    }

    @PostMapping
    ChatMessage simpleChatResponse(@RequestBody ChatMessage message) {
        return this.memoryChatService.simpleChat(message.text());
    }
}
