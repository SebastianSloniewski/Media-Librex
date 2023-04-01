package pl.ziwg.medialibrex.API.BookAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BookApiService {
    private final RestTemplate restTemplate;
    @Autowired
    public BookApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String searchByTitle(String title) {
        String url = String.format("https://openlibrary.org/search.json?title=%s", title);
        return restTemplate.getForObject(url, String.class);
    }

    public String getBookDetailsByIsbn(String isbn) {
        String url = String.format("https://openlibrary.org/isbn/%s.json", isbn);
        return restTemplate.getForObject(url, String.class);
    }
    public String getCoverImageUrlByIsbn(String isbn,
                                         String size,
                                         String typeId) {
        return String.format("https://covers.openlibrary.org/b/%s/%s-%s.jpg",typeId,isbn,size);
    }

    public String searchAuthorsByName(String name){
        String url = String.format("https://openlibrary.org/search/authors.json?q=%s", name);
        return restTemplate.getForObject(url, String.class);
    }

    public String getBookByAuthorKey(String authorKey,
                                     String limit) {
        String url = String.format("https://openlibrary.org/authors/%s/works.json?limit=%s", authorKey, limit);
        return restTemplate.getForObject(url, String.class);
    }

    public String getBooksBySubject(String subject,
                                  String limit) {
        String url = String.format("http://openlibrary.org/subjects/%s.json?details=True&limit=%s", subject, limit);
        return restTemplate.getForObject(url, String.class);
    }
}
