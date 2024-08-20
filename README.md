# multi_parameter_security

인증에 Username, Password뿐만 아니라 주차 타워별로 인증 처리 필요하여
인증시 주차타워Seq를 3번째 parameter로 받아서
AbstractAuthenticationToken의 Details로 Binding 하여 loadUserByUsername시 Username과 함께 사용
