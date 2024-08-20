package kr.or.thekeeperskorea.mb_usr.model.car;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UnregCarDto {

    private Long unregCarManageId;
    private String carNo;
    private String carDvTy;
    private Long eeSttCdId;
    private LocalDateTime eeSttChgDtm;
    private String rmk;
    private Character delAt;
    private Character useAt;
    private Long regPsId;
    private LocalDateTime regDtm;
    private Long updPsId;
    private LocalDateTime updDtm;
    private Long prkplceId;
    private Long usrId;
    private Long carEeReqInfoId;

}




