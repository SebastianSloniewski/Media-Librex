package pl.ziwg.medialibrex.API.BookAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.ziwg.medialibrex.API.MediaItem;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class BookApiService {
    private final RestTemplate restTemplate;
    @Autowired
    public BookApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> searchByTitle(String title) {
        String url = String.format("https://openlibrary.org/search.json?title=%s", title);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = mapper.readTree(response);
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }
        int items = jsonNode.get("numFound").asInt();
        List<MediaItem> listBooks = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("docs").get(i);
            if (itemJson == null){
                continue;
            }
            String key_raw = itemJson.get("key") != null ? itemJson.get("key").asText() : null;
            String key = key_raw.substring(key_raw.lastIndexOf("/")+1);
            String titleAlbum = itemJson.get("title").asText();
            String year = itemJson.get("first_publish_year") != null ? itemJson.get("first_publish_year").asText() : null;
            String cover_id = itemJson.get("cover_edition_key") != null ? itemJson.get("cover_edition_key").asText() : null;

            JsonNode authors = itemJson.get("author_name") != null ? itemJson.get("author_name") : null;
            List<String> authorNamesList = new ArrayList<>();
            if (authors != null) {
                Iterator<JsonNode> authorNamesIterator = authors.elements();
                while (authorNamesIterator.hasNext()) {
                    JsonNode authorNameNode = authorNamesIterator.next();
                    authorNamesList.add(authorNameNode.asText());
                }
            }

            JsonNode subjects = itemJson.get("subject") != null ? itemJson.get("subject") : null;
            List<String> subjectsList = new ArrayList<>();
            if (subjects != null) {
                Iterator<JsonNode> subjectsIterator = subjects.elements();
                while (subjectsIterator.hasNext()) {
                    JsonNode subjectsNode = subjectsIterator.next();
                    subjectsList.add(subjectsNode.asText());
                }
            }

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleAlbum);
            for (String author : authorNamesList){
                book.addPerson(author, "author");
            }
            book.setMediaType("book");
            for (String subject : subjectsList){
                book.addSubject(subject);
            }
            book.setYear(year);
            book.addCover(getCoverImageUrlByIsbn(cover_id, "S", "OLID"), "S");
            book.addCover(getCoverImageUrlByIsbn(cover_id, "M", "OLID"), "M");
            book.addCover(getCoverImageUrlByIsbn(cover_id, "L", "OLID"), "L");
            listBooks.add(book);
        }

        return listBooks;
    }

    public MediaItem getBookDetailsByIsbn(String isbn) {
        String url = String.format("https://openlibrary.org/isbn/%s.json", isbn);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = mapper.readTree(response);
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }
        String title = jsonNode.get("title").asText();
        JsonNode covers = jsonNode.get("covers") != null ? jsonNode.get("covers") : null;
        List<String> coversList = new ArrayList<>();
        if (covers != null) {
            Iterator<JsonNode> coversIterator = covers.elements();
            while (coversIterator.hasNext()) {
                JsonNode coversNode = coversIterator.next();
                coversList.add(getCoverImageUrlByIsbn(coversNode.asText(), "M", "id"));
                coversList.add(getCoverImageUrlByIsbn(coversNode.asText(), "L", "id"));
                coversList.add(getCoverImageUrlByIsbn(coversNode.asText(), "S", "id"));

            }
        }
        JsonNode subjects = jsonNode.get("subject") != null ? jsonNode.get("subject") : null;
        List<String> subjectsList = new ArrayList<>();
        if (subjects != null) {
            Iterator<JsonNode> subjectsIterator = subjects.elements();
            while (subjectsIterator.hasNext()) {
                JsonNode subjectsNode = subjectsIterator.next();
                subjectsList.add(subjectsNode.asText());
            }
        }
        String year = jsonNode.get("first_publish_date") != null ? jsonNode.get("first_publish_date").asText() : null;
        String description = jsonNode.get("description") != null ? jsonNode.get("description").asText() : null;
        MediaItem book = new MediaItem();
        book.setId(isbn);
        book.setTitle(title);

        for (String cover : coversList) {
            book.addCover(cover, null);
        }
        book.setMediaType("book");
        for (String subject : subjectsList) {
            book.addSubject(subject);
        }
        book.setDescription(description);
        book.setYear(year);
        return book;
    }
    public String getCoverImageUrlByIsbn(String isbn,
                                         String size,
                                         String typeId) {
        return String.format("https://covers.openlibrary.org/b/%s/%s-%s.jpg", typeId, isbn, size);
    }

    public List<MediaItem> getBookByAuthorKey(String authorKey,
                                              String limit) {
        String url = String.format("https://openlibrary.org/authors/%s/works.json?limit=%s", authorKey, limit);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = mapper.readTree(response);
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }
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

            JsonNode subjects = jsonNode.get("subjects") != null ? jsonNode.get("subjects") : null;
            List<String> subjectsList = new ArrayList<>();
            if (subjects != null) {
                Iterator<JsonNode> subjectsIterator = subjects.elements();
                while (subjectsIterator.hasNext()) {
                    JsonNode subjectsNode = subjectsIterator.next();
                    subjectsList.add(subjectsNode.asText());
                }
            }

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleAlbum);
            for (String subject : subjectsList) {
                book.addSubject(subject);
            }
            book.setMediaType("book");
            listBooks.add(book);
        }

        return listBooks;
    }

    public List<MediaItem> getBooksBySubject(String subject,
                                             String limit) {
        String url = String.format("http://openlibrary.org/subjects/%s.json?details=True&limit=%s", subject, limit);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = mapper.readTree(response);
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }
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
            String year = itemJson.get("first_publish_year") != null ? itemJson.get("first_publish_year").asText() : null;
            JsonNode subjects = jsonNode.get("subject") != null ? jsonNode.get("subject") : null;
            List<String> subjectsList = new ArrayList<>();
            if (subjects != null) {
                Iterator<JsonNode> subjectsIterator = subjects.elements();
                while (subjectsIterator.hasNext()) {
                    JsonNode subjectsNode = subjectsIterator.next();
                    subjectsList.add(subjectsNode.asText());
                }
            }
            JsonNode authors = jsonNode.get("authors") != null ? jsonNode.get("authors") : null;
            List<String> authorsList = new ArrayList<>();
            if (authors != null) {
                Iterator<JsonNode> authorsIterator = authors.elements();
                while (authorsIterator.hasNext()) {
                    JsonNode authorsNode = authorsIterator.next();
                    authorsList.add(authorsNode.get("name").asText());
                }
            }

            MediaItem book = new MediaItem();
            book.setId(key);
            book.setTitle(titleBook);
            book.setMediaType("book");
            book.setYear(year);
            for (String sub : subjectsList) {
                book.addSubject(sub);
            }
            for (String author : authorsList) {
                book.addSubject(author);
            }
            listBooks.add(book);
        }

        return listBooks;
    }
}
