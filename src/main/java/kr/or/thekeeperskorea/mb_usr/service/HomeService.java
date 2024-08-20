package kr.or.thekeeperskorea.mb_usr.service;


import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import kr.or.thekeeperskorea.mb_usr.repository.CarEntExitReqInfoRepository;
import kr.or.thekeeperskorea.mb_usr.repository.HomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HomeRepository homeRepository;
    private final CarEntExitReqInfoRepository carEntExitReqInfoRepository;

    public Map<String, Object> getUserCar(Long usrId, Long prkplceId){

       /* userCar = homeRepository.getUserCar(usrId);
        userCarCnt = homeRepository.getUserCarCnt(usrId);*/

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("getUserCarlist", homeRepository.getUserCarlist(usrId, prkplceId));
        result.put("leavingCarCnt", carEntExitReqInfoRepository.leavingCarCnt(prkplceId));
        result.put("userCarCnt", homeRepository.getUserCarCnt(usrId, prkplceId));
        return result;
    }


}
