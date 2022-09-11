import CategorySelect from "./CategorySelect";
import SearchBox from "./SearchBox";
import SortSelect from "./SortSelect";
import Switch from "@mui/material/Switch";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../../store/produc-slice";
import { uiAction } from "../../../store/ui-slice";

let isInitial = true;

const SearchSection = () => {
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(false);
  const [categorySelectValue, setCategorySelectValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchReq, setSearchReq] = useState("");
  const products = useSelector((state) => state.product.products);
  // const filterProducts = useCallback(() => {
  //   let isAvailable;
  //   if (switchValue) {
  //     isAvailable = 0;
  //   } else {
  //     isAvailable = 1;
  //   }
  //   axios
  //     .get(
  //       `http://localhost:8080/products/filters?productCategories=${categorySelectValue}&productName=${searchReq}&inventory=${isAvailable}&sortBy=${sortSelectValue}`
  //     )
  //     .then((res) => {
  //       dispatch(productAction.setProducts(res.data));
  //     });
  // }, [switchValue, categorySelectValue, sortSelectValue, searchReq, dispatch]);

  useEffect(() => {
    if (!isInitial) {
      const filterProducts = async () => {
        let isAvailable;
        if (switchValue) {
          isAvailable = 0;
        } else {
          isAvailable = 1;
        }
        try {
          dispatch(uiAction.displaySpinner());
          dispatch(productAction.hideStatus());
          const response = await axios.get(
            `http://localhost:8080/products/filters?productCategories=${categorySelectValue}&productName=${searchReq}&inventory=${isAvailable}&sortBy=${sortSelectValue}`
          );
          dispatch(uiAction.hideSpinner());
          dispatch(productAction.setProducts(response.data));
          if (response.data.length === 0) {
            dispatch(productAction.displayStatus("No product found"));
          }
        } catch (error) {
          dispatch(uiAction.hideSpinner());
          dispatch(productAction.displayStatus(error.message));
        }
      };
      filterProducts();
    }
    isInitial = false;
  }, [switchValue, categorySelectValue, sortSelectValue, searchReq, dispatch]);

  const sortSelectChangeHandler = (event) => {
    setSortSelectValue(event.target.value);
  };

  const categorySelectChangeHandler = (event) => {
    setCategorySelectValue(event.target.value);
  };
  const onSwitchChange = (event) => {
    setSwitchValue(event.target.checked);
  };
  const searchInputChangeHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  useEffect(() => {
    let timer;
    if (!isInitial) {
      timer = setTimeout(() => {
        setSearchReq(searchInputValue);
      }, 600);
    }
    isInitial = false;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchInputValue]);

  useEffect(() => {
    return () => {
      isInitial = true;
    };
  }, []);

  return (
    <div className="px-6 sm:px-4 md:px-3 lg:px-5 lg:w-full lg:pl-6 lg:pr-0 xl:pl-4 xl:pr-0 mt-6 md:mt-8 lg:flex lg:items-center">
      <div className="sm:flex justify-center lg:w-2/3">
        <SearchBox
          searchInputChangeHandler={searchInputChangeHandler}
          searchInputValue={searchInputValue}
        />
        <div className="flex sm:w-46/100 max-w-md mx-auto">
          <CategorySelect
            categorySelectValue={categorySelectValue}
            categorySelectChangeHandler={categorySelectChangeHandler}
          />
          <SortSelect
            sortSelectChangeHandler={sortSelectChangeHandler}
            sortSelectValue={sortSelectValue}
          />
        </div>
      </div>
      <div className="mt-6 lg:mt-0 flex items-center justify-between max-w-md mx-auto lg:mx-0 sm:max-w-none sm:pr-4 sm:pl-2 lg:w-3/10">
        <div>
          <Switch onChange={onSwitchChange} />
          <span className="text-gray-700 text-md">Available products</span>
        </div>
        <p className="text-gray-500 font-normal text-sm">
          {products.length} Products
        </p>
      </div>
    </div>
  );
};
export default React.memo(SearchSection);
