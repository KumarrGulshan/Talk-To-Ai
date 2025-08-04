package com.ai.Talkai;


import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;



import java.util.List;

@Service
public class ChatService {
    private final ChatModel chatModel;
    public ChatService(ChatModel chatModel){
        this.chatModel = chatModel;
    }
    public String getResponse(String prompt){
         return chatModel.call(prompt);

    }
    public String getResponseOptions(String promptText) {
        Prompt prompt = new Prompt("Your prompt here");
        ChatResponse response = chatModel.call(prompt);
        return response.getResult().getOutput().getText();

    }
}
