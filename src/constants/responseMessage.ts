/* USERS */
export const SIGN_UP_SUCCESS = '회원가입에 성공했습니다.';
export const EXIST_USER = '이미 존재하는 사용자입니다.';

export const GET_ALL_USER_SUCCESS = '모든 사용자를 불러왔습니다.';
export const GET_ONE_USER_SUCCESS = '조건에 해당하는 사용자를 불러왔습니다.';
export const NO_USER = '조건에 해당하는 사용자가 없습니다.';

export const DELETE_USER_SUCCESS = '사용자를 삭제했습니다.';
export const DELETE_USER_FAIL = '사용자가 존재하지 않거나 이미 삭제되었습니다.';

export default {
  // NORMAL
  NULL_VALUE: '필수 값 누락',
  OUT_OF_VALUE: '파라미터 값 오류',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',

  // USER POST
  SIGN_IN_SUCCESS: '로그인 성공',
  SING_IN_FAIL: '로그인 실패',
  NO_EXIST_ID: '존재하지 않는 아이디',

  // IMG POST
  IMG_UP_SUCCESS: '이미지 등록 성공',
  IMG_UPLOAD_FAIL: '이미지 등록 실패',
  IMG_TYPE_ERROR: '이미지 파일 타입 에러',
  IMG_SIZE_ERROR: '이미지 크기 에러',

  // MIX
  MIX_SUCCESS: '이미지 합성 성공',
  MIX_FAIL: '이미지 합성 실패',

  // AUTH
  AUTH_SUCCESS: '회원 인증 성공',
  AUTH_FAIL: '회원 인증 실패',
};
