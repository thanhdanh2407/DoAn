import React, { useState, useEffect } from "react";
import { Button, InputForm } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigeta = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigeta("/");
  }, [isLoggedIn, navigeta]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này.",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải có tối thiểu 6 kí tự.",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ.",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  return (
    <div className="bg-white w-600 p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-3">
        {isRegister && (
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={"HỌ TÊN"}
            value={payload.name}
            setValue={setPayload}
            type={"name"}
          />
        )}
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"SỐ ĐIỆN THOẠI"}
          value={payload.phone}
          setValue={setPayload}
          type={"phone"}
        />
        <InputForm
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          label={"MẬT KHẨU"}
          value={payload.password}
          setValue={setPayload}
          type={"password"}
        />
        <Button
          text={isRegister ? "Đăng kí" : "Đăng nhập"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => {
                setIsRegister(false);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn đã quên mật khẩu
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
                setPayload({
                  phone: "",
                  password: "",
                  name: "",
                });
              }}
              className="text-[blue] hover:text-[red] cursor-pointer"
            >
              Tạo tải khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
