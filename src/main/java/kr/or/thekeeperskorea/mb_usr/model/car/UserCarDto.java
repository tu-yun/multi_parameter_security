package kr.or.thekeeperskorea.mb_usr.model.car;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UserCarDto {

    private Long carManageId;
    private String carNo;
    private LocalDateTime vhcleRegDt;
    private String carDvTy;
    private Long sttCdId;
    private Character thisMonthCalcAt;
    private Character nextMonthCalcAt;
    private LocalDateTime thisMonthCalcAtRegDtm;
    private Long eeSttCdId;
    private String eeSttCdNm;
    private String rmk;
    private Character delAt;
    private Character useAt;
    private Long regPsId;
    private LocalDateTime regDtm;
    private Long updPsId;
    private LocalDateTime updDtm;
    private Long usrId;
    private Long prkplceId;
    private String cdNm;

    private String aptDong;
    private String aptHo;
    private Character pwdInitlAt;
    private String sttCdNm;
    private LocalDate lastCalcDt;
    private Character regAt;
    private String carCnt; // 차량 카운터
    private Long manageId;

    private LocalDate regDtmIns;
    private LocalDate eeSttChgDt;
    private Long unregCarManageId;
    private LocalDateTime eeSttChgDtm;
    private Long waitSeq;
    private Long carEeReqInfoId;

}

