package crossmade.api_ai.memory;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import crossmade.api_ai.chat.ChatMessage;

@RestController
@RequestMapping("/api/chat-memory")
public class MemoryChatController {

    private final MemoryChatService memoryChatService;

    public MemoryChatController(MemoryChatService memoryChatService) {
        this.memoryChatService = memoryChatService;
    }

    @PostMapping
    public ChatMessage simpleChatResponse(@RequestBody ChatMessage message) {
        var response = this.memoryChatService.simpleChat(message.text());
        return response;
    }

}
