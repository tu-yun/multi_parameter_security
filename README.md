# multi_parameter_security

인증에 Username, Password뿐만 아니라 주차 타워별로 인증 처리 필요하여
인증시 주차타워Seq를 3번째 parameter로 받아서
AbstractAuthenticationToken의 Details로 Binding 하여 loadUserByUsername시 Username과 함께 사용

1. WebAuthenticationDetails를 상속받은 CustomAuthenticationDetails 생성하여 주차장seq 변수를 추가함.

2. CustomAuthenticationDetails를 Binding 할 수 있도록 AuthenticationDetailsSource를 구현한 CustomAuthenticationDetailsSource 추가

3. AbstractUserDetailsAuthenticationProvider를 상속받은 CustomAuthenticationProvider 생성하여 retrieveUser 메소드에서
loadUserByUsername 호출할때 주차장seq 변수도 인자로 넘겨서 주차장seq도 회원 조회에 사용하도록 구현함.
