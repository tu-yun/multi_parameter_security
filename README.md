# multi_parameter_security

Question : 기본 인증에 필요한 Username, Password에 parkingPlace에 따라 별도 로그인 페이지를 사용하여야 함.

Answer : LoginForm에서 Username, Password와 함께 parkingPlace를 parameter로 받아서 3개 parameter가 모두 만족할때 인증 처리함.

[소스 소개]
1. src/main/java/kr/or/thekeeperskorea/mb_usr/config/security/CustomAuthenticationDetails.java
   - AbstractAuthenticationToken에 있는 Object details에 parkingPlace parameter를 Binding 할 수 있도록 WebAuthenticationDetails 상속받아 parkingPlace 변수를 추가함. 

2. src/main/java/kr/or/thekeeperskorea/mb_usr/config/security/CustomAuthenticationDetailsSource.java
   - AbstractAuthenticationToken에 details을 빌드하기 위해 AuthenticationDetailsSource를 상속받아 buildDetails 메소드를 재정의함.

3. src/main/java/kr/or/thekeeperskorea/mb_usr/config/security/CustomAuthenticationProvider.java
   - AbstractUserDetailsAuthenticationProvider를 상속받아서 username, parkingPlace로 회원을 조회하도록 retrieveUser 메소드를 재정의함.
  
4. src/main/java/kr/or/thekeeperskorea/mb_usr/service/UserService.java
   - UserDetailsService 구현체로서 username, parkingPlace로 회원을 조회하는 loadUserByUsernameAndPlace 메소드를 생성함. 
