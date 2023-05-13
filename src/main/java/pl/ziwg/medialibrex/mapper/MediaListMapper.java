//package pl.ziwg.medialibrex.mapper;
//
//import org.mapstruct.Mapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import pl.ziwg.medialibrex.API.BookAPI.BookApiService;
//import pl.ziwg.medialibrex.API.MediaItem;
//import pl.ziwg.medialibrex.API.MovieAPI.MovieApiService;
//import pl.ziwg.medialibrex.API.MusicAPI.MusicApiService;
//import pl.ziwg.medialibrex.dto.MediaListDTO;
//import pl.ziwg.medialibrex.dto.MediaListItemDTO;
//import pl.ziwg.medialibrex.dto.UserGetDTO;
//import pl.ziwg.medialibrex.entity.MediaList;
//import pl.ziwg.medialibrex.entity.MediaListItem;
//import pl.ziwg.medialibrex.entity.User;
//
//import java.util.Collection;
//import java.util.List;
//
//@Mapper(componentModel = "spring")
//abstract class  MediaListMapper {
//
//    @Autowired
//    BookApiService bookApiService;
//
//    @Autowired
//    MusicApiService musicApiService;
//
//    @Autowired
//    MovieApiService movieApiService;
//
//    public MediaListItem toMediaListItem(MediaListItemDTO mediaListItemDTO) {
//        MediaListItem mediaListItem = new MediaListItem();
//        mediaListItem.setId(mediaListItemDTO.getId());
//        mediaListItem.setListPositionIndex(mediaListItemDTO.getListPositionIndex());
//        mediaListItem.setDateAdded(mediaListItemDTO.getDateAdded());
//        mediaListItem.setMediaItemId(mediaListItemDTO.getMediaItem().getId());
//        mediaListItem.setMediaItemType(mediaListItemDTO.getMediaItem().getMediaType());
//        return mediaListItem;
//    }
//
//    public abstract List<MediaListItem> toMediaListItemList(Collection<MediaListItemDTO> mediaListItemDTOCollection);
//
//    public MediaListItemDTO toMediaListItemDTO(MediaListItem mediaListItem) {
//        MediaListItemDTO mediaListItemDTO = new MediaListItemDTO();
//        mediaListItemDTO.setId(mediaListItem.getId());
//        mediaListItemDTO.setListPositionIndex(mediaListItem.getListPositionIndex());
//        mediaListItemDTO.setDateAdded(mediaListItem.getDateAdded());
//        MediaItem mediaItem = switch (mediaListItem.getMediaItemType()) {
//            case "book" -> bookApiService.getBookDetailsByIsbn(mediaListItem.getMediaItemId());
//            case "music" -> musicApiService.getAlbumByMbid(mediaListItem.getMediaItemId());
//            default -> movieApiService.getMovieByIMDb(mediaListItem.getMediaItemId());
//        };
//        mediaListItemDTO.setMediaItem(mediaItem);
//        return mediaListItemDTO;
//    }
//
//    public abstract List<MediaListItem> toMediaListItemDTOList(Collection<MediaListItemDTO> mediaListItemDTOCollection);
//
//    public abstract MediaList toMediaList(MediaListDTO mediaListDTO);
//
//    public abstract MediaListDTO toMediaListDTO(MediaList mediaList);
//
//    public abstract User toUser(UserGetDTO userGetDTO);
//
//    public abstract UserGetDTO toUserGetDTO(User user);
//
//}
