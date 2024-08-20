package kr.or.thekeeperskorea.mb_usr.config.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class CustomException extends RuntimeException {

    public CustomException(String msg) {
        super(msg);
    }

    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }

}
