import React, { memo } from 'react';
import {Routes, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { path } from '.././utils'
import HomePage from '../components/HomePage/HomePage';
import Shoes from '../components/Products/ShoesList/Shoes';
import BagList from '../components/Products/BagsList/BagList';
import HatList from '../components/Products/HatList/HatList';
import Clothes from '../components/Products/Clothes/Clothes';


function PublicRoute({isLogin}) {

    return (
        <>
            <Routes>
                <Route path={path.HOMEPAGE} element={<HomePage />}/> 
                <Route path={path.GIAY_MLB} element={<Shoes />} />
                <Route path={path.GIAY_MLB_BIGBALL_CHUNKY} element={<Shoes />} />
                <Route path={path.GIAY_MLB_MULE} element={<Shoes />} />
                <Route path={path.GIAY_MLB_CHUNKY_LINER} element={<Shoes />} />
                <Route path={path.GIAY_MLB_PLAYBALL} element={<Shoes />} />
                <Route path={path.GIAY_MLB_CHUNKY_CLASSIC} element={<Shoes />} />
                <Route path={path.GIAY_MLB_CHUNKY_RUNNER} element={<Shoes />} />
                <Route path={path.DEP_MLB} element={<Shoes />} />

                <Route path={path.TUI_MLB} element={<BagList />} />
                <Route path={path.TUI_MLB_BUCKET_BAG} element={<BagList />} />
                <Route path={path.TUI_MLB_HIP_SACK} element={<BagList />} />
                <Route path={path.TUI_MLB_HOBO_BAG} element={<BagList />} />
                <Route path={path.TUI_MLB_CROSS_BAG} element={<BagList />} />
                <Route path={path.TUI_MLB_TOTE_BAG} element={<BagList />} />
                <Route path={path.TUI_MLB_PHONE_POUCH} element={<BagList />} />
                <Route path={path.BALO_MLB} element={<BagList />} />

                <Route path={path.MU_NON_MLB} element={<HatList />} />
                <Route path={path.NON_MLB_BALL_CAP} element={<HatList />} />
                <Route path={path.NON_MLB_BUCKET_HAT} element={<HatList />} />
                <Route path={path.NON_MLB_SUN_CAP} element={<HatList />} />

                <Route path={path.OUTFIT_MLB} element={<Clothes />} />
                <Route path={path.OUTFIT_MLB_TSHIRT} element={<Clothes />} />
                <Route path={path.OUTFIT_MLB_SHORTS} element={<Clothes />} />
                <Route path={path.OUTFIT_MLB_SKIRT_DRESS} element={<Clothes />} />
            </Routes>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PublicRoute));
