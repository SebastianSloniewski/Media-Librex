package pl.ziwg.medialibrex.API.BookAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.ziwg.medialibrex.API.MediaItem;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookApiService {
    private final RestTemplate restTemplate;
    @Autowired
    public BookApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> searchByTitle(String title) throws JsonProcessingException {
        String url = String.format("https://openlibrary.org/search.json?title=%s", title);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        int items = jsonNode.get("numFound").asInt();
        List<MediaItem> listBooks = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("docs").get(i);
            if (itemJson == null){
                continue;
            }
            String key_raw = itemJson.get("key") != null ? itemJson.get("key").asText() : null;
            String key = key_raw.substring(key_raw.lastIndexOf("/")+1);
            String author = itemJson.get("author_name") != null ? itemJson.get("author_name").get(0).asText() : null;
            String titleAlbum = itemJson.get("title").asText();

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleAlbum);
            book.setAuthor(author);
            book.setMediaType("book");
            listBooks.add(book);
        }

        return listBooks;
    }

    public MediaItem getBookDetailsByIsbn(String isbn) throws JsonProcessingException {
        String url = String.format("https://openlibrary.org/isbn/%s.json", isbn);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);

        String title = jsonNode.get("title").asText();
        String genre = jsonNode.get("subjects").get(0).asText(); // TODO
        String year = jsonNode.get("first_publish_date").asText();

        MediaItem book = new MediaItem();
        book.setId(isbn);
        book.setTitle(title);
        book.setMediaType("book");
        book.setGenre(genre);
        book.setYear(year);
        return book;
    }
    public String getCoverImageUrlByIsbn(String isbn,
                                         String size,
                                         String typeId) {
        return String.format("https://covers.openlibrary.org/b/%s/%s-%s.jpg", typeId, isbn, size);
    }

    public List<MediaItem> getBookByAuthorKey(String authorKey,
                                              String limit) throws JsonProcessingException {
        String url = String.format("https://openlibrary.org/authors/%s/works.json?limit=%s", authorKey, limit);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        int items = jsonNode.get("size").asInt();
        List<MediaItem> listBooks = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("entries").get(i);
            if (itemJson == null){
                continue;
            }
            String key_raw = itemJson.get("key") != null ? itemJson.get("key").asText() : null;
            String key = key_raw.substring(key_raw.lastIndexOf("/")+1);
            String titleAlbum = itemJson.get("title").asText();

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleAlbum);
            book.setMediaType("book");
            listBooks.add(book);
        }

        return listBooks;
    }

    public List<MediaItem> getBooksBySubject(String subject,
                                             String limit) throws JsonProcessingException {
        String url = String.format("http://openlibrary.org/subjects/%s.json?details=True&limit=%s", subject, limit);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        int items = Integer.parseInt(limit);
        List<MediaItem> listBooks = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("works").get(i);
            if (itemJson == null){
                continue;
            }
            String key_raw = itemJson.get("key") != null ? itemJson.get("key").asText() : null;
            String key = key_raw.substring(key_raw.lastIndexOf("/")+1);
            String titleBook = itemJson.get("title").asText();

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleBook);
            book.setMediaType("book");
            listBooks.add(book);
        }

        return listBooks;
    }
}
