package kr.or.thekeeperskorea.mb_usr.repository;


import kr.or.thekeeperskorea.mb_usr.model.car.CarEntExitReqInfoDto;
import kr.or.thekeeperskorea.mb_usr.model.car.ReqCancelHstDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReqCanCelHstRepository {

    void reqCanCelInsert(ReqCancelHstDto canCelInset);

}
