package kr.or.thekeeperskorea.mb_usr.config.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ExceptionResponse {

    private LocalDateTime timestamp;
    private int stateCode;
    private String message;
    private String path;

}
