package kr.or.thekeeperskorea.mb_usr.repository;


import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeRepository {

    List<UserCarDto> getUserCarlist(Long usrId, Long prkplceId);
    Integer getUserCarCnt(Long usrId, Long prkplceId);

}
