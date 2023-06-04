package pl.ziwg.medialibrex.mapper;

import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import pl.ziwg.medialibrex.API.BookAPI.BookApiService;
import pl.ziwg.medialibrex.API.MediaItem;
import pl.ziwg.medialibrex.API.MovieAPI.MovieApiService;
import pl.ziwg.medialibrex.API.MusicAPI.MusicApiService;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.MediaListItemDTO;
import pl.ziwg.medialibrex.dto.UserGetDTO;
import pl.ziwg.medialibrex.dto.post.MediaListItemPostDTO;
import pl.ziwg.medialibrex.entity.MediaList;
import pl.ziwg.medialibrex.entity.MediaListItem;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class MediaListMapper {
    @Autowired
    protected BookApiService bookApiService;
    @Autowired
    protected MusicApiService musicApiService;
    @Autowired
    protected MovieApiService movieApiService;

    public MediaListItem toMediaListItem(MediaListItemDTO mediaListItemDTO) {
        MediaListItem mediaListItem = new MediaListItem();
        mediaListItem.setId(mediaListItemDTO.getId());
        mediaListItem.setListPositionIndex(mediaListItemDTO.getListPositionIndex());
        mediaListItem.setDateAdded(mediaListItemDTO.getDateAdded());
        mediaListItem.setMediaItemId(mediaListItemDTO.getMediaItem().getId());
        mediaListItem.setMediaItemType(mediaListItemDTO.getMediaItem().getMediaType());
        return mediaListItem;
    }

    public abstract List<MediaListItem> toMediaListItemList(List<MediaListItemDTO> mediaListItemDTOList);

    public MediaListItemDTO toMediaListItemDTO(MediaListItem mediaListItem) {
        MediaListItemDTO mediaListItemDTO = new MediaListItemDTO();
        mediaListItemDTO.setId(mediaListItem.getId());
        mediaListItemDTO.setListPositionIndex(mediaListItem.getListPositionIndex());
        mediaListItemDTO.setDateAdded(mediaListItem.getDateAdded());
        MediaItem mediaItem = switch (mediaListItem.getMediaItemType()) {
            case "book" -> bookApiService.getBookDetailsByIsbn(mediaListItem.getMediaItemId());
            case "music" -> musicApiService.getAlbumByMbid(mediaListItem.getMediaItemId());
            default -> movieApiService.getMovieByIMDb(mediaListItem.getMediaItemId());
        };
        mediaListItemDTO.setMediaItem(mediaItem);
        return mediaListItemDTO;
    }

    public abstract MediaListItem toMediaListItem(MediaListItemPostDTO mediaListItemPostDTO);

    public abstract List<MediaListItem> toMediaListItemListFromPost(List<MediaListItemPostDTO> mediaListItemPostDTOList);

    public abstract List<MediaListItemDTO> toMediaListItemDTOList(List<MediaListItem> mediaListItemList);

    public abstract MediaList toMediaList(MediaListDTO mediaListDTO);

    public abstract MediaListDTO toMediaListDTO(MediaList mediaList);

    public abstract List<MediaList> toMediaListList(List<MediaListDTO> mediaListDTOList);

    public abstract List<MediaListDTO> toMediaListDTOList(List<MediaList> mediaListList);

    public abstract User toUser(UserGetDTO userGetDTO);

    public abstract UserGetDTO toUserGetDTO(User user);

    public abstract List<User> toUserList(List<UserGetDTO> userGetDTOList);

    public abstract List<UserGetDTO> toUserGetDTOList(List<User> userList);

}
