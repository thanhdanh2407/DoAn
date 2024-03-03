import React from "react";
import { text } from "../../ultils/constant";
import { Province, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";

const Homepage = () => {
  // Sử dụng nullish coalescing operator (??) để xác định giá trị mặc định cho categories, prices và areas
  const { categories, prices, areas } = useSelector((state) => state.app) ?? {};

  // Kiểm tra nếu categories, prices hoặc areas là undefined, trả về một thông báo hoặc hiển thị nội dung khác
  if (!categories || !prices || !areas) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble={true}
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
