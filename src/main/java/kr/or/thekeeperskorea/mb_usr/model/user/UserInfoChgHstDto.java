package kr.or.thekeeperskorea.mb_usr.model.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UserInfoChgHstDto {

    private Long usrChgHstId;
    private Long chgReasonCdId;
    private String rmk;
    private Long updPsId;
    private LocalDateTime updDtm;
    private Long usrId;

}
