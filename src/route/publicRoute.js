import React, { memo } from 'react';
import {Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { categorieType, listBag, listClothes, listHat, listShoesSandals, path, typeShoesSandanl } from '.././utils'
import HomePage from '../components/HomePage/HomePage';
import Shoes from '../components/Products/ShoesList/Shoes';
import BagList from '../components/Products/BagsList/BagList';
import HatList from '../components/Products/HatList/HatList';
import Clothes from '../components/Products/Clothes/Clothes';
import AccountInfor from '../components/AccountPage/AccountInfor';
import ChangePassword from '../components/AccountPage/ChangePassword';
import ListProductSearchByName from '../components/SearchProducts/ListProductSearchByName/ListProductSearchByName';
import Favourite from '../components/Favourites/Favourite';
import Product from '../components/common/product/Product';
import PageCart from '../components/carts/PageCart';


function PublicRoute() {

    return (
        <>
            <Routes>
                <Route path={path.HOMEPAGE} element={<HomePage />}/> 

                <Route path={path.GIAY_MLB} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={[listShoesSandals.SANDAL, listShoesSandals.SHOES]}/>} />
                <Route path={path.BIGBALL_CHUNKY} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES}/>} />
                <Route path={path.MULE} element={<Shoes categoryActive={categorieType.SHOES_SANDAL}/>} type={listShoesSandals.SHOES}/>
                <Route path={path.CHUNKY_LINER} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES}/>} />
                <Route path={path.GIAY_MLB_PLAYBALL} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES}/>} />
                <Route path={path.CHUNKY_CLASSIC} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES}/>} />
                <Route path={path.CHUNKY_RUNNER} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES}/>} />
                <Route path={path.SANDALS} element={<Shoes categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SANDAL}/>} />

                <Route path={path.TUI_MLB} element={<Shoes categoryActive={categorieType.BAG_BALO} type={[listBag.BALO, listBag.BAG]}/>} />
                <Route path={path.BUCKET_BAG} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.HIP_SACK} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.HOBO_BAG} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.CROSS_BAG} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.TOTE_BAG} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.PHONE_POUCH} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BAG} />} />
                <Route path={path.BACKPACK} element={<Shoes categoryActive={categorieType.BAG_BALO} type={listBag.BALO} />} />

                <Route path={path.MU_NON_MLB} element={<Shoes categoryActive={categorieType.HAT} type={[listHat.HAT1, listHat.HAT2]} />} />
                <Route path={path.BALL_CAP} element={<Shoes categoryActive={categorieType.HAT} type={listHat.HAT1} />} />
                <Route path={path.BUCKET_HAT} element={<Shoes categoryActive={categorieType.HAT} type={listHat.HAT2} />} />
                <Route path={path.SUN_CAP} element={<Shoes categoryActive={categorieType.HAT} type={listHat.HAT1} />} />

                <Route path={path.OUTFIT_MLB} element={<Shoes categoryActive={categorieType.CLOTHES} type={[listClothes.SHIRT, listClothes.SHORTS, listClothes.DRESS1, listClothes.DRESS2]} />} />
                <Route path={path.TSHIRT} element={<Shoes categoryActive={categorieType.CLOTHES} type={listClothes.SHIRT} />} />
                <Route path={path.SHORTS} element={<Shoes categoryActive={categorieType.CLOTHES} type={listClothes.SHORTS} />} />
                <Route path={path.SKIRT_DRESS} element={<Shoes categoryActive={categorieType.CLOTHES} type={[listClothes.DRESS1, listClothes.DRESS2]} />} />

                <Route path={path.ACCOUNT} element={<AccountInfor />}></Route>
                <Route path={path.ACCOUNT_CHANGE_PASSWORD} element={<ChangePassword />}></Route>

                <Route path={path.SEARCH_PRODUCT} element={<ListProductSearchByName />}></Route>

                <Route path={path.FAVOURITE} element={<Favourite />}></Route>

                <Route path={`${path.PRODUCT}/:productName`} element={<Product />}></Route>

                <Route path={path.CART} element={<PageCart />}></Route>
            </Routes>
        </>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(PublicRoute));
