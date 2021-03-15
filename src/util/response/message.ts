/* AUTH */
export const AUTH_SUCCESS = '회원 인증 성공';
export const AUTH_FAIL = '회원 인증 실패';

/* USERS */
export const SIGN_UP_SUCCESS = '회원가입에 성공했습니다.';
export const EXIST_USER = '이미 존재하는 사용자입니다.';

export const GET_ALL_USER_SUCCESS = '모든 사용자를 불러왔습니다.';
export const GET_ONE_USER_SUCCESS = '조건에 해당하는 사용자를 불러왔습니다.';
export const NO_USER = '조건에 해당하는 사용자가 없습니다.';

export const DELETE_USER_SUCCESS = '사용자를 삭제했습니다.';
export const DELETE_USER_FAIL = '사용자가 존재하지 않거나 이미 삭제되었습니다.';

export const MODIFY_USER_SUCCESS = '사용자 정보를 수정하였습니다.';
export const MODIFY_USER_FAIL = '사용자 정보 수정을 실패했습니다.';

export const EXIST_EMAIL = '이미 존재하는 이메일입니다.';
export const EXIST_ID = '이미 존재하는 아이디입니다.';

/* POSTS */
export const POST_UP_SUCCESS = '게시물 업로드를 성공하였습니다.';

export const EDIT_SUCCESS = '게시물 수정을 성공하였습니다.';
export const EDIT_FAIL = '게시물을 수정을 실패했습니다.';

export const DELETE_POST_SUCCESS = '게시물을 삭제했습니다.';
export const DELETE_POST_FAIL = '존재하지 않거나 이미 삭제된 게시물입니다.';

export const POST_NOT_EXISTS = '존재하지 않는 포스트입니다.';

export const GET_ALL_POST_SUCCESS = '모든 게시물을 불러왔습니다.';
export const GET_USER_POST_SUCCESS = '해당 사용자의 게시물을 불러왔습니다.';
export const GET_ONE_POST_SUCCESS = '해당 게시물의 상세내역을 불러왔습니다.';
export const GET_POST_FAIL = '게시물을 받아오지 못했습니다.';

export const GET_PAGE_POST_SUCCESS = '요청한 게시글 페이지를 불러왔습니다.';
export const GET_PAGE_POST_FAIL = '요청한 게시글 페이지를 불러오지 못했습니다';

export const GET_POST_BY_CATEGORY_SUCCESS = '해당 카테고리의 게시물을 불러왔습니다.';
export const GET_POST_BY_NESTED_SUCCESS = '해당 카테고리와 연관된 모든 게시물을 불러왔습니다.';
export const GET_MIX_POST_SUCCESS = '합성된 게시글을 불러왔습니다.';

export const GET_FAVORITE_POST_SUCCESS = '사용자의 즐겨찾기 게시물들을 불러왔습니다.';

export const GET_ONGOING_POST_SUCCESS = '펀딩이 진행중인 게시물들을 불러왔습니다.';
export const GET_END_POST_SUCCESS = '펀딩이 끝난 게시물들을 불러왔습니다.';

/* CATEGORIES */
export const GET_ALL_CATEGORY_SUCCESS = '모든 카테고리를 불러왔습니다.';
export const GET_GROUP_CATEGORY_SUCCESS = '해당 카테고리와 연관된 카테고리를 불러왔습니다';
export const GET_NESTED_CATEGORY_SUCCESS = '해당 카테고리와 연관된 모든 카테고리를 불러왔습니다.';
export const GET_CATEGORY_FAIL = '해당 카테고리를 불러오지 못했습니다.';

/* IMAGES */
export const IMAGE_UPLOAD_SUCCESS = '이미지 업로드를 성공하였습니다.';
export const IMAGE_UPLOAD_FAIL = '이미지 업로드를 실패했습니다';
export const GET_IMAGE_SUCCESS = '해당 이미지를 불러왔습니다.';
export const GET_IMAGE_FAIL = '이미지를 불러오지 못했습니다.';
export const DELETE_IMAGE_SUCCESS = '해당 이미지를 삭제했습니다.';
export const DELETE_IMAGE_FAIL = '이미지가 존재하지 않거나 이미 삭제되었습니다.';

/* Mix */
export const MIX_SUCCESS = '이미지 합성을 성공하였습니다.';
export const MIX_FAIL = '이미지 합성을 실패했습니다.';
export const ALREADY_MIXED = '이미 합성된 이미지입니다.';
export const GET_MIX_INFO_SUCCESS = '이미지 합성 정보를 가져왔습니다.';
export const GET_MIX_INFO_FAIL = '이미지 합성 정보를 가져오지 못했습니다.';
export const DELETE_MIX_SUCCESS = '이미지 합성 내역을 삭제했습니다.';
export const NO_MIX_EXIST = '해당 합성 내역이 존재하지 않습니다';
export const MIX_POST_SUCCESS = '합성 이미지로 게시글을 생성하였습니다.';
export const MIX_POST_FAIL = '합성 이미지로 게시글을 생성하지 못했습니다.';

/* FAVORITES */
export const FAVORITE_POST_SUCCESS = '게시물 즐겨찾기를 성공하였습니다.';
export const FAVORITE_DELETE_SUCCESS = '게시물 즐겨찾기 해제를 성공하였습니다.';
export const EXIST_FAVORITE = '이미 즐겨찾기한 게시물입니다.';
export const NOT_EXIST_FAVORITE = '즐겨찾기한 적 없는 게시물입니다.';

/* FUNDINGS */
export const FUNDING_POST_SUCCESS = '펀딩을 성공하였습니다.';
export const EXIST_FUNDING = '이미 펀딩한 게시물입니다.';
export const NOT_EXIST_FUNDING = '펀딩한 적 없는 게시물입니다.';
export const GET_FUNDING_COUNT_SUCCESS = '펀딩 개수를 가져왔습니다.';
export const GET_FUNDING_DUEDATE_SUCCESS = '펀딩 기한을 가져왔습니다.';
export const GET_FUNDING_DUEDATE_FAIL = '펀딩 기한을 가져오지 못했습니다.';
