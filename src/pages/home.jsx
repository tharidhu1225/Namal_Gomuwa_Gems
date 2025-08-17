import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import HomeSlider from "../components/HomeSlider";
import HomeCatSlider from "../components/CatSlider";
import ProductSlider from "../components/ProductSlider";
import GemLoader from "../components/LoadingEffect";

const Home = () => {
  const [value, setValue] = useState(0); // Tabs
  const [gems, setGems] = useState([]);
  const [jewellery, setJewellery] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const endpoint =
          value === 0
            ? `${import.meta.env.VITE_BACKEND_URL}/api/gem`
            : `${import.meta.env.VITE_BACKEND_URL}/api/jewellery`;

        const res = await axios.get(endpoint, {
          headers: { "Cache-Control": "no-cache" },
        });

        // ✅ Extract correct array from response
       if (value === 0) {
  setGems(res.data.data || []);
  console.log("Gems",res.data.data)
} else {
  setJewellery(res.data.data || []);
  console.log("Juwelerry",res.data.data)
}

      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [value]);

  const currentProducts = value === 0 ? gems : jewellery;


  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="leftSec mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">Popular Products</h3>
              <p className="text-sm text-gray-600">
                Don't miss current offers before end of the month.
              </p>
            </div>
            <Box sx={{ bgcolor: "background.paper" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="product category tabs"
              >
                <Tab label="Gems" />
                <Tab label="Juwellery" />
              </Tabs>
            </Box>
          </div>

          {loading ? (
            <GemLoader/>
          ) : (
            <ProductSlider items={6} products={currentProducts} />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
