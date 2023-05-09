package pl.ziwg.medialibrex.API.BookAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class BookApiController {
    private final BookApiService bookApiService;

    public BookApiController(BookApiService bookApiService) {
        this.bookApiService = bookApiService;
    }

    @GetMapping("/books/search")
    public String searchBooks(@RequestParam String title) throws JsonProcessingException {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(bookApiService.searchByTitle(title));
    }

    @GetMapping("/books/{isbn}")
    public String getBook(@PathVariable String isbn) throws JsonProcessingException {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(bookApiService.getBookDetailsByIsbn(isbn));
    }

    @GetMapping("/books/cover")
    public String getCover(@RequestParam String typeId,
                           @RequestParam String size,
                           @RequestParam String id) {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.getCoverImageUrlByIsbn(id,size,typeId);
    }

    @GetMapping("/author/{authorKey}/books")
    public String getAuthorBooks(@PathVariable String authorKey,
                                 @RequestParam String limit) throws JsonProcessingException {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(bookApiService.getBookByAuthorKey(authorKey, limit));
    }

    @GetMapping("/books/subject/{subject}")
    public String getSubjectBooks(@PathVariable String subject,
                                 @RequestParam String limit) throws JsonProcessingException {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(bookApiService.getBooksBySubject(subject, limit));
    }
}
