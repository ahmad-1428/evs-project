// Inside your authReducer (or wherever userInfo is managed)
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true };
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userInfo: action.payload };
    // ADD THIS CASE BELOW:
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return { loading: false, userInfo: action.payload }; 
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};
