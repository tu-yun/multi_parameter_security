package kr.or.thekeeperskorea.mb_usr.repository;

import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.model.user.UserInfoChgHstDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {

    UserDto getLoad(String username);

    UserDto getLoadByParkingPlace(String username, Long parkingPlace);

    void insertUserLoginHst(Long usrId);

    List<UserDto> getMyUserList(Long usrId);

    void insertUserInfoChgHst(UserInfoChgHstDto userInfoChgHst);

}
