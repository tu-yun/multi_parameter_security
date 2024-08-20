package kr.or.thekeeperskorea.mb_usr.common.util;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

@Component
public class MessageUtil {

    @Resource
    private MessageSource source;

    static MessageSource messageSource;

    @PostConstruct
    public void initialize() {
        messageSource = source;
    }

    public static String getMessage(String messageCd) {
        return messageSource.getMessage(messageCd, null, null);
    }

    public static String getMessage(String messageCd, Object[] messageArgs) {
        return messageSource.getMessage(messageCd, messageArgs, null);
    }

}
