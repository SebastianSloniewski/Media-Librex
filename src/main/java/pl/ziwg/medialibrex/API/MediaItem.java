package pl.ziwg.medialibrex.API;

public class MediaItem {
    private String id;
    private String title;
    private String author;
    private String cover;
    private String mediaType;
    private String genre;
    private String year;

    public MediaItem() {
        this.id = null;
        this.title = null;
        this.author = null;
        this.cover = null;
        this.mediaType = null;
        this.genre = null;
        this.year = null;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
