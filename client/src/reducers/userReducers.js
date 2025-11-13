// reducers/userReducers.js
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
        case USER_UPDATE_PROFILE_SUCCESS:
  return {
    loading: false,
    success: true,
    userInfo: action.payload,
  };

      default:
        return state;
    }
  };
  