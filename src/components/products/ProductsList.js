import ProductItem from "./ProductItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { productAction } from "../../store/produc-slice";
import CircularProgress from "@mui/material/CircularProgress";
import { uiAction } from "../../store/ui-slice";

// import { getProducts } from "../../store/product-actions";

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoadingSpinnerDisplayed = useSelector(
    (state) => state.ui.isLoadingSpinnerDisplayed
  );
  const productStatus = useSelector((state) => state.product.status);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch(uiAction.displaySpinner());
        dispatch(productAction.hideStatus());
        const response = await axios.get("http://localhost:8080/products/all");
        dispatch(uiAction.hideSpinner());
        dispatch(productAction.setProducts(response.data));
        if (response.data.length === 0) {
          dispatch(productAction.displayStatus("No product found"));
        }
      } catch (error) {
        console.log(error);
        dispatch(uiAction.hideSpinner());
        dispatch(productAction.displayStatus(error.message));
      }
    };

    // const getUserCart = async () => {
    //   try {
    //     const response = await axios({
    //       method: "get",
    //       url: "http://localhost:8080/user/cart",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token,
    //       },
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    getAllProducts();
    // if (isLoggedIn) {
    //   getUserCart();
    // }
  }, [dispatch]);

  // const productItems = [
  //   {
  //     id: 1,
  //     name: "Asus lap top",
  //     price: 1200,
  //     imageUrl: "https://static.frame.work/92cqdkoguwxj1a5w5ks5rnjs7nl8",
  //     inventory: 10,
  //     productCategories: "lap top",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  //   {
  //     id: 2,
  //     name: "Acer lap top",
  //     price: 900,
  //     imageUrl:
  //       "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
  //     inventory: 4,
  //     productCategories: "lap top",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  //   {
  //     id: 3,
  //     name: "Acer lap top",
  //     price: 1050,
  //     imageUrl:
  //       "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
  //     inventory: 0,
  //     productCategories: "lap top",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  //   {
  //     id: 4,
  //     name: "Apple mobile phone",
  //     price: 1400,
  //     imageUrl:
  //       "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
  //     inventory: 4,
  //     productCategories: "mobile phone",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  //   {
  //     id: 5,
  //     name: "Apple mobile phone",
  //     price: 850,
  //     imageUrl:
  //       "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
  //     inventory: 0,
  //     productCategories: "mobile phone",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  //   {
  //     id: 6,
  //     name: "Apple mobile phone",
  //     price: 720,
  //     imageUrl:
  //       "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
  //     inventory: 2,
  //     productCategories: "mobile phone",
  //     createdAt: "2022-09-08 12:19:15.000000",
  //     lastModifiedAt: "2022-09-08 12:19:15.000000",
  //   },
  // ];

  const productItemsList = products.map((product) => {
    return <ProductItem key={product.id} product={product} />;
  });

  if (isLoadingSpinnerDisplayed) {
    return (
      <div className="mt-32 text-center">
        <CircularProgress />
      </div>
    );
  }

  if (productStatus) {
    return (
      <div className="mt-24">
        <h2 className="text-xl text-gray-500 text-center">{productStatus}</h2>
      </div>
    );
  }

  return (
    <div className="mt-6 sm:flex sm:flex-row sm:flex-wrap justify-center px-6 sm:px-2 lg:mt-4">
      {productItemsList}
    </div>
  );
};
export default ProductsList;
