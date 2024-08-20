package kr.or.thekeeperskorea.mb_usr.repository;


import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CarRepository {

    List<UserCarDto> selectMyCarList(Long usrId);

    List<UserCarDto> selectUtlCarList(Long prkplceId, Long usrId, String keyword, LocalDate startDt, LocalDate endDt);

    Integer selectUtlCarCnt(Long prkplceId, Long usrId, String keyword, LocalDate startDt, LocalDate endDt);

    void userModify(UserCarDto userCarDto) throws Exception;


}
