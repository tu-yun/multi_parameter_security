package kr.or.thekeeperskorea.mb_usr.config.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class CustomAuthenticationDetails extends WebAuthenticationDetails {

    private Long parkingPlace;

    public CustomAuthenticationDetails(HttpServletRequest request) {
        super(request);
        this.parkingPlace = Long.valueOf(request.getParameter("parkingPlace"));
    }

    public Long getParkingPlace() {
        return this.parkingPlace;
    }

}
