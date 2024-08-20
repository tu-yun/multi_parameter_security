package kr.or.thekeeperskorea.mb_usr.repository;


import kr.or.thekeeperskorea.mb_usr.model.car.CarEntExitReqInfoDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UnregCarDto;
import org.springframework.stereotype.Repository;


@Repository
public interface CarEntExitReqInfoRepository {

      void setUnregInset(CarEntExitReqInfoDto carEntExitReqInfoDto);
      void setUsrInset(CarEntExitReqInfoDto carEntExitReqInfoDto);
      void carSttCancelUpdate(CarEntExitReqInfoDto carEntExitReqInfoDto);
      Integer leavingCarCnt(Long prkplceId);
}
