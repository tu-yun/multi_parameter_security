package kr.or.thekeeperskorea.mb_usr.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface MypageRepository {

    int updatePasswordNew(Long usrId, String newPw);
    int updatePassword(Long usrId, Long prkplceId, String newPw);

}
