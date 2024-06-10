import React, { memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { categorieType, listBag, listClothes, listHat, listShoesSandals, path, typeShoesSandanl } from '.././utils'
import HomePage from '../components/HomePage/HomePage';
import ListProductOption from '../components/Products/ListProductOption';
import AccountInfor from '../components/accountInfor/AccountInfor';
import ChangePassword from '../components/changePassword/ChangePassword';
import PageProductSearchByName from '../components/SearchProducts/pageProductSearchByName/PageProductSearchByName';
import Favourite from '../components/Favourites/Favourite';
import Product from '../components/common/product/Product';
import PageCart from '../components/carts/PageCart';
import TutorialSize from '../components/tutorialSize/TutorialSize';
import Payment from '../components/payments/Payment';
import OrderTracking from '../components/orderTracking/OrderTracking';
import OrderTrackingDetail from '../components/orderTracking/OrderTrackingDetail';

function PublicRoute() {

    return (
        <>
            <Routes>
                <Route path={path.HOMEPAGE} element={<HomePage titlePage='Trang chủ' />} />

                <Route path={path.GIAY_MLB} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={[listShoesSandals.SANDAL, listShoesSandals.SHOES]} titlePage='Giày dép MLB' />} />
                <Route path={path.BIGBALL_CHUNKY} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Bigball chunky' titlePage='Giày MLB | Giày BigBall Chunky' />} />
                <Route path={path.MULE} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Mule' titlePage='Giày MLB | Giày Mule' />} />
                <Route path={path.CHUNKY_LINER} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Chunky liner' titlePage='Giày MLB | Giày Chunky Liner' />} />
                {/* <Route path={path.GIAY_MLB_PLAYBALL} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Chunky liner' titlePage='Giày MLB | Giày Chunky Liner'/>} /> */}
                <Route path={path.CHUNKY_CLASSIC} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Chunky classic' titlePage='Giày MLB | Giày Chunky Classic' />} />
                <Route path={path.CHUNKY_JOGGER} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SHOES} productType='Chunky jogger' titlePage='Giày MLB | Giày Chunky Jogger' />} />
                <Route path={path.SANDALS} element={<ListProductOption categoryActive={categorieType.SHOES_SANDAL} type={listShoesSandals.SANDAL} productType='Sandals' titlePage='Dép MLB' />} />

                <Route path={path.TUI_MLB} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={[listBag.BALO, listBag.BAG]} titlePage='Túi Balo MLB' />} />
                <Route path={path.BUCKET_BAG} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Bucket bag' titlePage='Túi MLB Bucket Bag' />} />
                <Route path={path.HIP_SACK} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Hip sack' titlePage='Túi MLB Bao Tử' />} />
                <Route path={path.HOBO_BAG} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Hobo bag' titlePage='Túi MLB Xách tay' />} />
                <Route path={path.CROSS_BAG} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Cross bag' titlePage='Túi MLB Đeo Chéo' />} />
                <Route path={path.TOTE_BAG} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Tote bag' titlePage='Túi MLB Tote Bag' />} />
                <Route path={path.PHONE_POUCH} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BAG} productType='Phone pouch' titlePage='Túi MLB Phone Pouch' />} />
                <Route path={path.BACKPACK} element={<ListProductOption categoryActive={categorieType.BAG_BALO} type={listBag.BALO} productType='Backpack' titlePage='Balo MLB' />} />

                <Route path={path.MU_NON_MLB} element={<ListProductOption categoryActive={categorieType.HAT} type={[listHat.HAT1, listHat.HAT2]} titlePage='Mũ Nón MLB' />} />
                <Route path={path.BALL_CAP} element={<ListProductOption categoryActive={categorieType.HAT} type={listHat.HAT1} productType='Ball cap' titlePage='Nón MLB - Ball Cap' />} />
                <Route path={path.BUCKET} element={<ListProductOption categoryActive={categorieType.HAT} type={listHat.HAT2} productType='Bucket' titlePage='Nón MLB - Bucket' />} />
                <Route path={path.SUN_CAP} element={<ListProductOption categoryActive={categorieType.HAT} type={listHat.HAT1} productType='Sun cap' titlePage='Mũ MLB - Sun Cap' />} />

                <Route path={path.OUTFIT_MLB} element={<ListProductOption categoryActive={categorieType.CLOTHES} type={[listClothes.SHIRT, listClothes.SHORTS, listClothes.DRESS1, listClothes.DRESS2]} titlePage='Outfit MLB' />} />
                <Route path={path.TSHIRT} element={<ListProductOption categoryActive={categorieType.CLOTHES} type={listClothes.SHIRT} productType='Tshirt' titlePage='Áo Thun MLB' />} />
                <Route path={path.SHORTS} element={<ListProductOption categoryActive={categorieType.CLOTHES} type={listClothes.SHORTS} productType='Shorts' titlePage='Quần Shorts MLB' />} />
                <Route path={path.SKIRT_DRESS} element={<ListProductOption categoryActive={categorieType.CLOTHES} type={[listClothes.DRESS1, listClothes.DRESS2]} productType='Skirt dress' titlePage='Chân Váy - Đầm MLB' />} />

                <Route path={path.ACCOUNT} element={<AccountInfor titlePage='Tài khoản khách hàng' />}></Route>
                <Route path={path.ACCOUNT_CHANGE_PASSWORD} element={<ChangePassword titlePage='Đổi mật khẩu' />}></Route>

                <Route path={path.SEARCH_PRODUCT} element={<PageProductSearchByName titlePage='Tìm kiếm sản phẩm' />}></Route>

                <Route path={path.FAVOURITE} element={<Favourite titlePage='Yêu thích' />}></Route>

                <Route path={`${path.PRODUCT}/:productName`} element={<Product />}></Route>

                <Route path={path.CART} element={<PageCart titlePage='Giỏ hàng' />}></Route>

                <Route path={path.TUTORIAL_SIZE} element={<TutorialSize titlePage='Bảng size MLB' />}></Route>

                <Route path={path.CHECKOUT} element={<Payment titlePage='Đặt đơn hàng' />}></Route>

                <Route path={path.ORDER_TRACKING} element={<OrderTracking titlePage='Theo dõi đơn hàng' />}></Route>
                <Route path={path.ORDER_TRACKING_DETAIL} element={<OrderTrackingDetail titlePage='Chi tiết đơn hàng' />}></Route>
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
