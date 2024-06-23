import React, { useEffect, useState, memo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './ListProductOption.scss'
import { useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, limit_page } from '../../../utils';
import Navbar from '../../../components/clients/navbar/Navbar';
import Pagination from '../../../components/pagination/Pagination'
import { useRef } from 'react';
import Loading from '../../../components/loading/Loading';
import Banner from '../../../components/clients/banner/Banner';
import ListProducts from '../../../components/clients/listProducts/ListProducts';
import OptionSort from '../../../components/clients/options/OptionSort';
import OptionType from '../../../components/clients/options/OptionType';
import OptionColor from '../../../components/clients/options/OptionColor';
import OptionLogo from '../../../components/clients/options/OptionLogo';
import Footer from '../../../components/clients/footer/Footer';

function ListProductOption({ productType, type, categoryActive, titlePage }) {
    const dispatch = useDispatch()
    const { categoryType } = useSelector(state => state.category)
    const { images } = useSelector(state => state.image)
    const { products, isLoading } = useSelector(state => state.product)
    const [optionSort, setOptionSort] = useState('default')
    const [optionType, setOptionType] = useState([])
    const [optionColor, setOptionColor] = useState([])
    const [optionLogo, setOptionLogo] = useState([])
    const [params] = useSearchParams()
    const listRef = useRef()
    const initialRender = useRef(true)
    const { state } = useLocation();

    useEffect(() => {
        dispatch(actions.refreshIsloadingStateProduct())
        dispatch(actions.getAllColors())
        dispatch(actions.getAllLogos())
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (listRef.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: listRef.current.offsetTop - 70
                });
            }
        }
    }, [listRef.current])

    useEffect(() => {
        document.title = titlePage
        const data = {
            optionType: optionType?.toString(',').length === 0 ? categoryActive : optionType?.toString(','),
            colors: optionColor?.toString(','),
            logos: optionLogo?.toString(','),
            // typeName: state?.id ? state?.id : '',
            typeName: productType
        }
        dispatch(actions.getLimitProductByOption(
            data,
            params.get('page') ? params.get('page') : 1,
            optionSort,
            limit_page
        ))

        if (listRef.current) {
            window.scrollTo({
                behavior: "smooth",
                top: listRef.current.offsetTop - 70
            });
        }
    }, [params.get('page'), optionSort, optionType, optionColor, optionLogo, state?.id])

    useEffect(() => {
        setOptionSort('default')
        setOptionType([])
        setOptionColor([])
        setOptionLogo([])
        dispatch(actions.refreshIsloadingStateProduct())
        dispatch(actions.getImageProductByCategory(categoryActive))
        const data = {
            optionType: optionType?.toString(',').length === 0 ? categoryActive : optionType?.toString(','),
            colors: optionColor?.toString(','),
            logos: optionLogo?.toString(','),
            // typeName: state?.id ? state?.id : ''
            typeName: productType
        }

        dispatch(actions.getLimitProductByOption(
            data,
            params.get('page') ? params.get('page') : 1,
            optionSort,
            limit_page
        ))
    }, [categoryActive])

    const handleOnchangeTypeType = (e, typeId) => {
        let arr = [...optionType]
        if (optionType.some(item => item === typeId)) {
            arr = optionType.filter(item => item !== typeId)
        }
        else {
            arr.push(typeId)
        }
        setOptionType(arr)
    }

    const handleOnchangeColor = (colorId) => {
        let arr = [...optionColor]
        if (optionColor.some(item => item === colorId)) {
            arr = optionColor.filter(item => item !== colorId)
        }
        else {
            arr.push(colorId)
        }
        setOptionColor(arr)
    }

    const handleOnchangeLogo = (logoId) => {
        let arr = [...optionLogo]
        if (optionLogo.some(item => item === logoId)) {
            arr = optionLogo.filter(item => item !== logoId)
        }
        else {
            arr.push(logoId)
        }
        setOptionLogo(arr)
    }

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <div className='shoes'>
                            <Navbar />
                            <Banner
                                categoryProduct={categoryType?.at(0)?.name}
                                title={`mlb việt nam | ${categoryType?.at(0)?.name} chính hãng tại việt nam`}
                            />

                            <div ref={listRef} className='shoes-body pt-5'>
                                <div className='shoes-container'>
                                    <div className='row'>
                                        <div className='options col-3'>
                                            <div className='options-list position-sticky ps-3'>
                                                <OptionSort handleSetOptionSort={setOptionSort} optionSort={optionSort} />
                                                <OptionType type={type} optionType={optionType} handleOnchangeTypeType={handleOnchangeTypeType} />
                                                <OptionColor handleOnchangeColor={handleOnchangeColor} optionColor={optionColor} />
                                                <OptionLogo handleOnchangeLogo={handleOnchangeLogo} optionType={optionType} />
                                            </div>
                                        </div>

                                        <div className='shoes-list col-9'>
                                            <div className='shoes-list-container'>
                                                <div className='menu-product row'>
                                                    <ListProducts products={products} images={images} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Pagination pathPage={path.GIAY_MLB} currentPage={params.get('page') || 1} />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </>
            }
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(ListProductOption));
