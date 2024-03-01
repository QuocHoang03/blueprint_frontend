import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Login.module.scss";
import { loginUser } from "../../services/userService";

const cx = classNames.bind(styles);

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [data, setData] = useState({
    valueLogin: "",
    password: "",
  });
  const isCheckInputs = () => {
    if (!data.valueLogin) {
      toast("Vui lòng nhập email hoặc số điện thoại");
      return false;
    }
    if (!data.password) {
      toast("Vui lòng nhập mật khẩu");
      return false;
    }
    return true;
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isCheck = isCheckInputs();
    if (isCheck === true) {
      let response = await loginUser(data);
      console.log(response);
      if (response.data && response.data.EC === 0) {
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("instructions")}>
        <img
          className={cx("instructions-img")}
          src="https://shopdunk.com/images/uploaded/banner/TND_M402_010%201.jpeg"
          alt="Not found!"
        />
      </div>
      <div className={cx("login")} onSubmit={handleSubmit}>
        <form className={cx("form-login")}>
          <h1 className={cx("heading")}>Đăng Nhâp</h1>
          <div className={cx("login-item")}>
            <label className={cx("login-item-label")}>E-mail or Phone:</label>
            <input
              className={cx("login-item-input")}
              name="valueLogin"
              type="text"
              onChange={handleOnChange}
            />
          </div>
          <div className={cx("login-item")}>
            <label className={cx("login-item-label")}>Mật khẩu:</label>
            <input
              className={cx("login-item-input")}
              name="password"
              type="password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className={cx("btnSubmit")}>
            Đăng nhập
          </button>
          <div className={cx("register")}>
            <b className={cx("register-question")}>Bạn Chưa Có Tài Khoản?</b>
            <Link className={cx("register-link")} to="/register">
              Đăng Ký Ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
