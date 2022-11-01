import { Provider, useDispatch, useSelector } from "react-redux";
import { store, wrapper } from "../store/store";
import "../styles/globals.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { LOCAL_TOKEN } from "../lib/constants";
import { keepLogin, logout } from "../store/functions/authFunction";
import { Spin } from "antd";
import Page from "../components/core/Page";

function MyApp({ Component, pageProps }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (token) {
      keepLogin(dispatch, token);
    } else {
      logout(dispatch);
    }
  }, []);

  return (
    <Provider store={store}>
      <Spin spinning={!user.storageIsChecked}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Spin>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
