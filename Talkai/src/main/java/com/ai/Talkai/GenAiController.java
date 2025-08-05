package com.ai.Talkai;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class GenAiController {
      private final ChatService chatService;
      private final ImageService imageService;
      private  final RecipeService recipeService;


    public GenAiController(ChatService chatService, ImageService imageService, RecipeService recipeService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.recipeService = recipeService;
    }
    @GetMapping("ask-ai")
    public  String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public  String getResponseOptions(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }

    @GetMapping("generate-image")
    public  void generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {
        ImageResponse imageResponse = imageService.generateImage(prompt);
        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

//    @GetMapping("generate-image")
//    public ImageResponse generateImage(HttpServletResponse response,
//    @RequestParam String prompt,
//    @RequestParam (defaultValue = "hd") String quality,
//    @RequestParam (defaultValue = "1") int n,
//    @RequestParam (defaultValue = "1024") int width,
//    @RequestParam (defaultValue = "1024") int height
//
//    ) throws IOException {
//        ImageResponse imageResponse = imageService.generateImage(prompt,quality, width, n , height);
//        //Streams to get urls from ImageResponse
//        List<String> imageUrls = imageResponse.getResult().stream()
//                .map(result -> result.getOutput().getUrl())
//                .toList();
//        return (ImageResponse) imageUrls;
//    }

    @GetMapping("/recipe-creator")
    public ResponseEntity<String> createRecipe(@RequestParam String prompt) {
        System.out.println("Received prompt: " + prompt);

        // Simulate recipe generation logic
        String recipe = "Here’s a recipe based on: " + prompt;

        return ResponseEntity.ok(recipe);
    }


}
