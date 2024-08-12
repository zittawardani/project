import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProduct from "@/components/ui/cardProducts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { ProductDataType } from "@/types/productDataTypes";
import axios from "axios";
import SkeletonGrid from "@/components/ui/skeletonGrid";
import Lottie from "lottie-react";
import upcommingAnimation from "../../../../public/animations/upcomming.json";

const BestProducts = () => {
  const categoryView = [
    "Website",
    "Web 3",
    "Android Application",
    "IOS Application",
    "Blockchain Service",
    "Bussiness Platform",
    "Gaming Exchange Based Token",
    "Payment Gateway",
    "Decentralized Exchange",
    "IOT",
    "Create Robot Trading",
    "Exchanger Platform",
    "Android Exchange",
    "IOS Exchange",
    "NFT Platform",
    "(COIN) - Sha 256",
    "(TOKEN) - ERC 20, BSC 20, TRC 20",
  ];
  const [productsData, setProductsData] = useState<ProductDataType[]>([]);
  const [category, setCategory] = useState("website");
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setLoad(true);
    try {
      const resp = await axios(`/api/product/get/categories?name=${category}`);
      setProductsData(resp.data);
      setTimeout(() => {
        // setLoad(false)
      }, 1000);
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [category]);

  return (
    <div className="w-full flex flex-col gap-8 lg:mt-5" id="products">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-2xl lg:text-5xl capitalize text-center font-semibold">
          Products
          <p className="text-sm text-[#455A64] mt-3">
            There are numbers of reasons
          </p>
        </h1>
        <p className="text-sm text-[#455A64] ">There are numbers of reasons</p>
      </div>
      <div className="w-full">
        <Tabs
          defaultValue="blockchain"
          className="w-full flex flex-col gap-5  lg:justify-center items-center overflow-x-scroll"
        >
          <div className="w-full overflow-x-scroll md:w-fit">
            <TabsList className="w-fit h-full">
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              <TabsTrigger value="website">Website</TabsTrigger>
              <TabsTrigger value="android">Android App</TabsTrigger>
              <TabsTrigger value="web">Web 3</TabsTrigger>
              <TabsTrigger value="ios">IOS Application</TabsTrigger>
              <TabsTrigger value="bussiness">Bussiness Platform</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="blockchain" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          <TabsContent value="website" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          <TabsContent value="android" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          <TabsContent value="web" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          <TabsContent value="ios" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
          <TabsContent value="bussiness" className="">
            <div className="w-full grid lg:grid-cols-5 grid-cols-1 gap-5">
              {productsData.slice(0, 10).map((item, index) => (
                <CardProduct
                  img={item.img}
                  title={item.title}
                  desc={item.desc}
                  priceType={item.priceType}
                  price={item.price}
                  category={item.category}
                  key={index}
                />
              ))}
            </div>
            <PaginationComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BestProducts;
