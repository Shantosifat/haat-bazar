import React from 'react';
import Banner from '../pages/Home/Banner/Banner';
import WhyChooseUs from '../pages/Home/WhyChooseUs/WhyChooseUs';
import ExploreMarkets from '../pages/Home/ExploreMarkets/ExploreMarkets';
import JoinAsVendor from '../pages/Home/JoinAsVendor/JoinAsVendor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <ExploreMarkets></ExploreMarkets>
            <JoinAsVendor></JoinAsVendor>
        </div>
    );
};

export default Home;