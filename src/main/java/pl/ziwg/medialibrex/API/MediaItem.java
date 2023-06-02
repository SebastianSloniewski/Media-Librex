package pl.ziwg.medialibrex.API;

import java.util.ArrayList;
import java.util.List;

public class MediaItem {
    private String id;
    private String title;
    private List<Person> people;
    private List<Cover> covers;
    private String mediaType;
    private List<String> subjects;
    private String year;
    public String description;

    public MediaItem() {
        this.id = null;
        this.title = null;
        this.people = null;
        this.covers = null;
        this.mediaType = null;
        this.subjects = null;
        this.year = null;
        this.description = null;
    }

    public static class Person {
        private String name;
        private String job;

        public Person() {
            this.name = null;
            this.job = null;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getJob() {
            return job;
        }

        public void setJob(String job) {
            this.job = job;
        }
    }

    public static class Cover {
        private String url;
        private String size;

        public Cover() {
            this.url = null;
            this.size = null;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }
    }

    public void addPerson(String name, String job) {
        if (people == null) {
            people = new ArrayList<>();
        }
        Person person = new Person();
        person.name = name;
        person.job = job;
        people.add(person);
    }

    public void addCover(String url, String size) {
        if (covers == null) {
            covers = new ArrayList<>();
        }
        Cover cover = new Cover();
        cover.url = url;
        cover.size = size;
        covers.add(cover);
    }

    public void addSubject(String subject) {
        if (subjects == null) {
            subjects = new ArrayList<>();
        }
        subjects.add(subject);
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

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    public List<Cover> getCovers() {
        return covers;
    }

    public void setCovers(List<Cover> covers) {
        this.covers = covers;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }
}