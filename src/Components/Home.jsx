import React from 'react';
import Banner from '../pages/Home/Banner/Banner';
import WhyChooseUs from '../pages/Home/WhyChooseUs/WhyChooseUs';
import ExploreMarkets from '../pages/Home/ExploreMarkets/ExploreMarkets';
import JoinAsVendor from '../pages/Home/JoinAsVendor/JoinAsVendor';
import ProductSection from '../pages/Home/ProductSection/ProductSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <WhyChooseUs></WhyChooseUs>
            <ExploreMarkets></ExploreMarkets>
            <JoinAsVendor></JoinAsVendor>
        </div>
    );
};

export default Home;