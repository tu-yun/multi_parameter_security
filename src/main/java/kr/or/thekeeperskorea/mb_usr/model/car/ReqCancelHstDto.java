package kr.or.thekeeperskorea.mb_usr.model.car;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ReqCancelHstDto {

private Long carEeReqInfoId;
private Long regPsId;
private LocalDateTime regDtm;
private Character reqCncEndAt;
private Long reqCncEndPsId;
private LocalDateTime reqCncEndDtm;
private String rmk;

}




