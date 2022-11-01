const init_state = {
  id: null,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  image: "",
  is_verified: false,
  is_active: false,
  errMsg: "",
  loading: false,
  storageIsChecked: false,
};

const authReducer = (state = init_state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        loading: false,
        storageIsChecked: true,
      };

    case "LOADING":
      return { ...state, loading: true, errMsg: "" };

    case "LOGOUT":
      return {
        id: null,
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        image: "",
        is_verified: false,
        is_active: false,
        errMsg: "",
        loading: false,
        storageIsChecked: true,
      };

    case "ERROR":
      return { ...state, errMsg: action.payload, loading: false };

    //   case "CHECK_STORAGE":
    //     return { ...state, storageIsChecked: true };

    //   case "LOADING":
    //     return { ...state, loading: action.payload };

    //   case "UNAME_ERR":
    //     return { ...state, unameErr: action.payload, loading: false };

    //   case "MAIL_ERR":
    //     return { ...state, mailErr: action.payload, loading: false };

    default:
      return state;
  }
};

export default authReducer;
