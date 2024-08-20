package kr.or.thekeeperskorea.mb_usr.model.car;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class UserCarMapDto {

    private List<UserCarDto> userCarList;
    private LocalDate regDt;

}


