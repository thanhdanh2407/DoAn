/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import logo from "../../assets/logonRMBG.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";

const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN);
  }, []);

  return (
    <div className="w-1100">
      <div className="w-1100 flex items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="w-[200px] h-[150px] object-contain"
        />
        <div className="flex items-center gap-1">
          <small>DKQ HOUSE xin chào !</small>
          <Button
            text={"Đăng nhập"}
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={goLogin}
          />
          <Button
            text={"Đăng ký "}
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={goLogin}
          />
          <Button
            text={"Đăng tin mới "}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
