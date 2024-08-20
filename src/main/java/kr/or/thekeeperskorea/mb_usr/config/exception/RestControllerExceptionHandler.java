package kr.or.thekeeperskorea.mb_usr.config.exception;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {
    private final Logger log = LoggerFactory.getLogger(getClass());

    /**
     * @RequestBody @ModelAttribute validation Exception
     */
    @ExceptionHandler(BindException.class)
    protected final ResponseEntity<Object> handleBindException(BindException ex, WebRequest request) {
        log.debug("ExceptionHandler:{}.class", ex.getClass());

        String message = ex.getBindingResult().getFieldError().getDefaultMessage();
        if(message == null || message.trim().equals("") || ex.getBindingResult().getFieldError().getCode().equals("typeMismatch")) {
            message = "요청하신 정보가 잘못되었습니다.";
        }

        ExceptionResponse exRes = ExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .stateCode(HttpServletResponse.SC_BAD_REQUEST)
                .message(message)
                .path(request.getDescription(false).substring(4))
                .build();

        return new ResponseEntity<Object>(exRes, HttpStatus.BAD_REQUEST);
    }

    /**
     * @RequestParam, @PathVariable validation Exception
     */
    @ExceptionHandler(ConstraintViolationException.class)
    protected final ResponseEntity<Object> handleConstraintViolationExceptions(ConstraintViolationException ex, WebRequest request) {
        log.debug("ExceptionHandler:{}.class", ex.getClass());

        String message = null;
        if(ex.getConstraintViolations().size() > 0) {
            for (final ConstraintViolation<?> violation : ex.getConstraintViolations()) {
                message = violation.getMessage();
            }
        }
        if(message == null || message.trim().equals("")) {
            message = "요청하신 정보가 잘못되었습니다.";
        }

        ExceptionResponse exRes = ExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .stateCode(HttpServletResponse.SC_BAD_REQUEST)
                .message(message)
                .path(request.getDescription(false).substring(4))
                .build();

        return new ResponseEntity<Object>(exRes, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomException.class)
    protected final ResponseEntity<Object> handleCustomException(Exception ex, WebRequest request) {
        log.debug("ExceptionHandler:{}.class", ex.getClass());

        ExceptionResponse exRes = ExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .stateCode(HttpServletResponse.SC_NOT_ACCEPTABLE)
                .message(ex.getMessage())
                .path(request.getDescription(false).substring(4))
                .build();

        return new ResponseEntity<Object>(exRes, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler
    protected final ResponseEntity<Object> handleAllException(Exception ex, WebRequest request) {
        log.debug("ExceptionHandler:{}.class", ex.getClass());
        ex.printStackTrace();

        ExceptionResponse exRes = ExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .stateCode(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
                .message("관리자에게 문의하세요.")
                .path(request.getDescription(false).substring(4))
                .build();

        return new ResponseEntity<Object>(exRes, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}