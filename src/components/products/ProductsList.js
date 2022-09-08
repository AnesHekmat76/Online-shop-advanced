import ProductItem from "./ProductItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/product-actions";

const ProductsList = () => {
  //   const dispatch = useDispatch();

  //   const productStatus = useSelector((state) => state.product.productStatus);
  //   const productItems = useSelector((state) => state.product.filteredProducts);

  //   useEffect(() => {
  //     dispatch(getProducts());
  //   }, [dispatch]);

  const productItems = [
    {
      id: 1,
      name: "Asus lap top",
      price: 1200,
      imageUrl: "https://static.frame.work/92cqdkoguwxj1a5w5ks5rnjs7nl8",
      inventory: 10,
      productCategories: "lap top",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
    {
      id: 2,
      name: "Acer lap top",
      price: 900,
      imageUrl:
        "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
      inventory: 4,
      productCategories: "lap top",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
    {
      id: 3,
      name: "Acer lap top",
      price: 1050,
      imageUrl:
        "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
      inventory: 4,
      productCategories: "lap top",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
    {
      id: 4,
      name: "Apple mobile phone",
      price: 1400,
      imageUrl:
        "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
      inventory: 4,
      productCategories: "mobile phone",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
    {
      id: 5,
      name: "Apple mobile phone",
      price: 850,
      imageUrl:
        "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
      inventory: 4,
      productCategories: "mobile phone",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
    {
      id: 6,
      name: "Apple mobile phone",
      price: 720,
      imageUrl:
        "https://www.aptronixindia.com/pub/media/catalog/product/i/p/iphone-12-red_6.png",
      inventory: 2,
      productCategories: "mobile phone",
      createdAt: "2022-09-08 12:19:15.000000",
      lastModifiedAt: "2022-09-08 12:19:15.000000",
    },
  ];

  const productItemsList = productItems.map((product) => {
    return <ProductItem key={product.id} product={product} />;
  });

  //   if (productStatus) {
  //     return (
  //       <div className="mt-16">
  //         <h2 className="text-xl text-gray-500 text-center">{productStatus}</h2>
  //       </div>
  //     );
  //   }

  return (
    <div className="mt-8 sm:flex sm:flex-row sm:flex-wrap justify-center px-6 sm:px-2 lg:mt-10">
      {productItemsList}
    </div>
  );
};
export default ProductsList;
