package kr.or.thekeeperskorea.mb_usr.model.car;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CarEntExitReqInfoDto {

    private Long carEeReqInfoId;
    private Long carDeHstId;
    private Long carManageId;
    private Long unregCarManageId;
    private Long eeSttCdId;
    private Long eeReqSttCdId;
    private Long regPsId;

    private LocalDateTime regDtm;
    private Character machineInputAt;
    private Long machineInputPsId;
    private LocalDateTime machineInputDtm;
    private Character carWaitAt;
    private Long carWaitPsId;
    private LocalDateTime carWaitDtm;
    private Character eeReqEndAt;
    private Long eeReqEndPsId;
    private LocalDateTime eeReqEndDtm;
    private String rmk;
    private Long usrId;
    private String carNo;

}


