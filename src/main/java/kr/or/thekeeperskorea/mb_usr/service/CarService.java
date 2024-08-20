package kr.or.thekeeperskorea.mb_usr.service;

import kr.or.thekeeperskorea.mb_usr.model.car.CarEntExitReqInfoDto;
import kr.or.thekeeperskorea.mb_usr.model.car.ReqCancelHstDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UnregCarDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import kr.or.thekeeperskorea.mb_usr.repository.CarEntExitReqInfoRepository;
import kr.or.thekeeperskorea.mb_usr.repository.CarRepository;
import kr.or.thekeeperskorea.mb_usr.repository.ReqCanCelHstRepository;
import kr.or.thekeeperskorea.mb_usr.repository.UnregCarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CarService {

    private final UnregCarRepository unregCarRepository;
    private final CarEntExitReqInfoRepository carEntExitReqInfoRepository;
    private final CarRepository carRepository;
    private final ReqCanCelHstRepository reqCanCelHstRepository;


    @Transactional
    public void regCar(UnregCarDto unregCarDto) {
        try {
            unregCarRepository.setInsert(unregCarDto);

            unregCarDto = unregCarRepository.getLoad(unregCarDto.getCarNo(), unregCarDto.getUsrId());

            CarEntExitReqInfoDto carEntExitReqInfoDto = new CarEntExitReqInfoDto();
            carEntExitReqInfoDto.setUnregCarManageId(unregCarDto.getUnregCarManageId());
            carEntExitReqInfoDto.setRegPsId(unregCarDto.getRegPsId());
            carEntExitReqInfoDto.setRegDtm(unregCarDto.getRegDtm());
            carEntExitReqInfoDto.setEeReqSttCdId(203L);
            carEntExitReqInfoDto.setEeSttCdId(102L);
            carEntExitReqInfoDto.setEeReqEndAt('N');
            carEntExitReqInfoRepository.setUnregInset(carEntExitReqInfoDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<UserCarDto> getMyCarList(Long usrId){
        return carRepository.selectMyCarList(usrId);
    }


    public Map<String, Object> getUtlCarList(Long prkplceId, Long usrId, String keyword, LocalDate startDt, LocalDate endDt){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("utlCarCnt", carRepository.selectUtlCarCnt(prkplceId, usrId, keyword, startDt, endDt));
        result.put("utlCarList", carRepository.selectUtlCarList(prkplceId, usrId, keyword, startDt, endDt));
        return result;
    }

    @Transactional
    public void modCarOut(UserCarDto userCarDto) {
        try {
            CarEntExitReqInfoDto carEntExitReqInfoDto = new CarEntExitReqInfoDto();

            Character thisMonthCalcAt = userCarDto.getThisMonthCalcAt();
            if (thisMonthCalcAt != null) {
                carEntExitReqInfoDto.setCarManageId(userCarDto.getCarManageId());
                carEntExitReqInfoDto.setRegPsId(userCarDto.getRegPsId());
                carEntExitReqInfoDto.setRegDtm(userCarDto.getRegDtm());
                carEntExitReqInfoDto.setEeSttCdId(103L);
                carEntExitReqInfoDto.setEeReqSttCdId(202L);
                carEntExitReqInfoDto.setEeReqEndAt('N');
                carEntExitReqInfoRepository.setUsrInset(carEntExitReqInfoDto);

                Long carEeReqInfoId = carEntExitReqInfoDto.getCarEeReqInfoId();

                userCarDto.setCarEeReqInfoId(carEeReqInfoId);
                userCarDto.setEeSttChgDtm(LocalDateTime.now());
                carRepository.userModify(userCarDto);
            } else if (thisMonthCalcAt == null) {

                carEntExitReqInfoDto.setUnregCarManageId(userCarDto.getUnregCarManageId());
                carEntExitReqInfoDto.setRegPsId(userCarDto.getRegPsId());
                carEntExitReqInfoDto.setRegDtm(userCarDto.getRegDtm());
                carEntExitReqInfoDto.setEeSttCdId(103L);
                carEntExitReqInfoDto.setEeReqSttCdId(202L);
                carEntExitReqInfoDto.setEeReqEndAt('N');
                carEntExitReqInfoRepository.setUnregInset(carEntExitReqInfoDto);

                Long carEeReqInfoId = carEntExitReqInfoDto.getCarEeReqInfoId();

                UnregCarDto unregCarDto = new UnregCarDto();
                unregCarDto.setCarEeReqInfoId(carEeReqInfoId);
                unregCarDto.setUsrId(userCarDto.getUsrId());
                unregCarDto.setCarNo(userCarDto.getCarNo());
                unregCarDto.setUpdPsId(userCarDto.getUsrId());
                unregCarDto.setUpdDtm(LocalDateTime.now());
                unregCarDto.setEeSttChgDtm(LocalDateTime.now());
                unregCarDto.setEeSttCdId(userCarDto.getEeSttCdId());
                unregCarRepository.unregModify(unregCarDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void cancelMod(UserCarDto userCarDto) {
        try {
            Character thisMonthCalcAt = userCarDto.getThisMonthCalcAt();

            CarEntExitReqInfoDto carEntExitReqInfoDto = new CarEntExitReqInfoDto();
            ReqCancelHstDto reqCancelHstDto = new ReqCancelHstDto();

            if (thisMonthCalcAt != null) {
                carEntExitReqInfoDto.setCarEeReqInfoId(userCarDto.getCarEeReqInfoId());

                if (userCarDto.getEeSttCdId() == 103){
                    carEntExitReqInfoDto.setEeSttCdId(105L);
                    carEntExitReqInfoRepository.carSttCancelUpdate(carEntExitReqInfoDto);
                } else {
                    carEntExitReqInfoDto.setEeSttCdId(106L);
                    carEntExitReqInfoRepository.carSttCancelUpdate(carEntExitReqInfoDto);
                }

                reqCancelHstDto.setCarEeReqInfoId(userCarDto.getCarEeReqInfoId());
                reqCancelHstDto.setRegPsId(userCarDto.getUsrId());
                reqCancelHstDto.setRegDtm(LocalDateTime.now());
                reqCancelHstDto.setReqCncEndAt('N');

                reqCanCelHstRepository.reqCanCelInsert(reqCancelHstDto);

                carRepository.userModify(userCarDto);
            } else if (thisMonthCalcAt == null) {
                carEntExitReqInfoDto.setCarEeReqInfoId(userCarDto.getCarEeReqInfoId());

                if (userCarDto.getEeSttCdId() == 103){
                    carEntExitReqInfoDto.setEeSttCdId(105L);
                    carEntExitReqInfoRepository.carSttCancelUpdate(carEntExitReqInfoDto);
                } else {
                    carEntExitReqInfoDto.setEeSttCdId(106L);
                    carEntExitReqInfoRepository.carSttCancelUpdate(carEntExitReqInfoDto);
                }

                reqCancelHstDto.setCarEeReqInfoId(userCarDto.getCarEeReqInfoId());
                reqCancelHstDto.setRegPsId(userCarDto.getUsrId());
                reqCancelHstDto.setRegDtm(LocalDateTime.now());
                reqCancelHstDto.setReqCncEndAt('N');

                reqCanCelHstRepository.reqCanCelInsert(reqCancelHstDto);

                UnregCarDto unregCarDto = new UnregCarDto();
                unregCarDto.setUsrId(userCarDto.getUsrId());
                unregCarDto.setCarNo(userCarDto.getCarNo());
                unregCarDto.setUpdPsId(userCarDto.getUsrId());
                unregCarDto.setUpdDtm(LocalDateTime.now());
                unregCarDto.setEeSttCdId(userCarDto.getEeSttCdId());
                unregCarRepository.unregModify(unregCarDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
