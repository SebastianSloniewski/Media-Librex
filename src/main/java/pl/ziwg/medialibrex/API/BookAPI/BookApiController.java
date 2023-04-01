package pl.ziwg.medialibrex.API.BookAPI;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class BookApiController {
    private final BookApiService bookApiService;

    public BookApiController(BookApiService bookApiService) {
        this.bookApiService = bookApiService;
    }

    @GetMapping("/books/search")
    public String searchBooks(@RequestParam String title) {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.searchByTitle(title);
    }

    @GetMapping("/books/{isbn}")
    public String getBook(@PathVariable String isbn) {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.getBookDetailsByIsbn(isbn);
    }

    @GetMapping("/books/cover")
    public String getCover(@RequestParam String typeId,
                           @RequestParam String size,
                           @RequestParam String id) {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.getCoverImageUrlByIsbn(id,size,typeId);
    }

    @GetMapping("/books/search/authors")
    public String searchAuthors(@RequestParam String author) {
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.searchAuthorsByName(author);
    }

    @GetMapping("/author/{authorKey}/books")
    public String getAuthorBooks(@PathVariable String authorKey,
                                 @RequestParam String limit){
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.getBookByAuthorKey(authorKey, limit);
    }

    @GetMapping("/books/subject/{subject}")
    public String getSubjectBooks(@PathVariable String subject,
                                 @RequestParam String limit){
        BookApiService bookApiService = new BookApiService(new RestTemplate());
        return bookApiService.getBooksBySubject(subject, limit);
    }
}
