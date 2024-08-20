package kr.or.thekeeperskorea.mb_usr.repository;


import kr.or.thekeeperskorea.mb_usr.model.car.UnregCarDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import org.springframework.stereotype.Repository;


@Repository
public interface UnregCarRepository {

    void setInsert(UnregCarDto unregCar);

    UnregCarDto getLoad(String carNo , Long usrId);

    void unregModify(UnregCarDto unregCarDto) throws Exception;
}
