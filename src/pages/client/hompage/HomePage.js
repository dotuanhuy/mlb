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
import { AES } from 'crypto-js';
import Loading from '../../../components/loading/Loading'

function HomePage({ titlePage }) {
    const dispatch = useDispatch()
    const { listId } = useSelector(state => state.order)
    const { products } = useSelector(state => state.product)

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getListOrderId())
        dispatch(actions.getAllProductPublic())
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, [])

    useEffect(() => {
        if (listId) {
            const encrypted = AES.encrypt(listId.toString(), process.env.REACT_APP_KEY_ORDERID)
            window.localStorage.setItem('orderId', encrypted)
        }
    }, [listId])

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
