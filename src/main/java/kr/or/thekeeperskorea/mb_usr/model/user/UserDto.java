package kr.or.thekeeperskorea.mb_usr.model.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class UserDto {

    private Long usrId;
    private String loginId;
    private String aptDong;
    private String aptHo;
    private String pwd;
    private String usrDvTy;
    private Character pwdInitlAt;
    private Long regPsId;
    private String rmk;
    private Long prkplceId;
    private String carDvTy;
    private String carNo;
    private LocalDate vhcleRegDt;
    private LocalDate lastCalcDt;
    private String prkplceDvTy;

}
