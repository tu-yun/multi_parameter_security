package kr.or.thekeeperskorea.mb_usr.resource;

import jakarta.validation.Valid;

import kr.or.thekeeperskorea.mb_usr.common.annotation.CurrentUser;
import kr.or.thekeeperskorea.mb_usr.model.car.CarEntExitReqInfoDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UnregCarDto;
import kr.or.thekeeperskorea.mb_usr.model.car.UserCarDto;
import kr.or.thekeeperskorea.mb_usr.model.user.UserDto;
import kr.or.thekeeperskorea.mb_usr.service.CarService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping({"apt/car" , "office/car"})
public class CarResource {

    private final CarService carService;

    /***
     * 방문예약
     * @param unregCar
     * @param user
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody UnregCarDto unregCar,
                                            @CurrentUser UserDto user ) {
        unregCar.setDelAt('N');
        unregCar.setUseAt('Y');
        unregCar.setCarDvTy("502");
        unregCar.setEeSttCdId(102L);
        unregCar.setRegPsId(user.getUsrId());
        unregCar.setUsrId(user.getUsrId());
        unregCar.setEeSttChgDtm(LocalDateTime.now());
        unregCar.setRegDtm(LocalDateTime.now());
        unregCar.setPrkplceId(1L);
        try {
            carService.regCar(unregCar);
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(false);
        }

    }

    @PostMapping("/modify")
    public ResponseEntity<Boolean> modify(@RequestBody UserCarDto userCarDto,
                                          @CurrentUser UserDto user) {
        try {
            userCarDto.setUpdPsId(user.getUsrId());
            userCarDto.setUpdDtm(LocalDateTime.now());
            userCarDto.setRegPsId(user.getUsrId());
            userCarDto.setRegDtm(LocalDateTime.now());
            userCarDto.setEeSttCdId(103L);
            carService.modCarOut(userCarDto);
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(false);
        }
    }
    @PostMapping("/cancelMod")
    public ResponseEntity<Boolean> cancelMod(@RequestBody UserCarDto userCarDto,
                                          @CurrentUser UserDto user) {
        try {
            if (userCarDto.getEeSttCdId() == 103){
                userCarDto.setUpdPsId(user.getUsrId());
                userCarDto.setUpdDtm(LocalDateTime.now());
                userCarDto.setEeSttChgDtm(LocalDateTime.now());
                userCarDto.setEeSttCdId(105L);
                carService.cancelMod(userCarDto);
            } else {
                userCarDto.setUpdPsId(user.getUsrId());
                userCarDto.setUpdDtm(LocalDateTime.now());
                userCarDto.setEeSttChgDtm(LocalDateTime.now());
                userCarDto.setEeSttCdId(106L);
                carService.cancelMod(userCarDto);
            }
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(false);
        }
    }







}
