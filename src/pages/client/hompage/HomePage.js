import React, { useEffect, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import Navbar from '../../../components/clients/navbar/Navbar';
import SliderHomePage from './Slider/SliderHomePage';
import Intro from './Intro/Intro';
import NewShoes from './NewShoes/NewShoes';
import MLBBag from './MLBBag/MLBBag';
import MLBOutfit from './MLBOutfit/MLBOutfit';
import MLBBackPack from './MLBBackPack/MLBBackPack';
import Footer from '../../../components/clients/footer/Footer';
import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux';
import Loading from '../../../components/loading/Loading'
import { toast } from 'react-toastify';
import { CustomToast, DELETE } from '../../../utils';

function HomePage({ titlePage }) {
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.favouriteProduct)
    const { products } = useSelector(state => state.product)

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getAllProductPublic())
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, [])

    useEffect(() => {
        if (status) {
            if (status === DELETE) {
                toast.info(CustomToast('Bạn vừa bỏ sản phẩm ra khỏi mục yêu thích'), { autoClose: 2000 })
            }
            else {
                toast.info(CustomToast('Bạn vừa thêm 1 sản phẩm vào mục yêu thích'), { autoClose: 2000 })
            }
            dispatch(actions.refreshIStatusFavouriteProduct())
        }
    }, [status])


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
                style={{
                    borderRadius: "10px",
                    padding: "10px",
                    transform: "translateY(10px)"
                }}
            >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
    }

    return (
        <>
            {
                !products ?
                    <Loading />
                    :
                    <div>
                        <Navbar />
                        <SliderHomePage settings={settings} />
                        <Intro />
                        <NewShoes />
                        <MLBBag />
                        <MLBOutfit />
                        <MLBBackPack />
                        <Footer />
                    </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.product.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));
