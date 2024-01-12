import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Bag.scss'
import { useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { 
    path, 
    categorieType, 
    listBag, 
    allCode, 
    typeBagBalo
} from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';
import Pagination from '../../Paginations/Pagination'
import { useRef } from 'react';
import Loading from '../../common/Loading/Loading';
import Banner from '../../common/Banners/Banner';
import ListProducts from '../../common/listProducts/ListProducts';
import OptionSort from '../../common/options/OptionSort';
import OptionType from '../../common/options/OptionType';
import OptionColor from '../../common/options/OptionColor';
import OptionLogo from '../../common/options/OptionLogo';
import HomeFooter from '../../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';

const arrColor = ['White', 'Black', 'Gray', 'Brown', 'Blue', 'Green', 'Pink', 'LightPink', 'Red', 'Orange', 'Yellow']
const arrOptionType = ['balo', 'bag']
const arrOptionLogo = ['NY', 'B', 'LA', 'P', 'SF']

const initOptionType = {
    balo: false,
    bag: false
}

const initOptionColor = {
    White: false,
    Black: false,
    Gray: false,
    Brown: false,
    Blue: false,
    Green: false,
    Pink: false,
    LightPink: false,
    Red: false,
    Orange: false,
    Yellow: false
}

const initOptionLogo = {
    NY: false,
    B: false,
    LA: false,
    P: false,
    SF: false,
}

function BagList({
    colors, 
    categories, 
    logos, 
    accessToken, 
    images,
    products,
    isLoading,
    fetchAllColorsRedux, 
    getCategoriesByIdRedux, 
    fetchAllCodeByTypeRedux,
    fetchAllImageProductRedux,
    getProductByCategoryRedux,
    getLimitProductsRedux,
    getLimitProductByOptionRedux,
    refreshIsloadingStateProductRedux,
    getAllProductsFavouriteRedux
}) {
    const [optionSort, setOptionSort] = useState('default')
    const [optionType, setOptionType] = useState(initOptionType)
    const [optionColor, setOptionColor] = useState(initOptionColor)
    const [optionLogo, setOptionLogo] = useState(initOptionLogo)
    const [params] = useSearchParams()
    const listRef = useRef()
    const { state } = useLocation()

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        fetchAllColorsRedux(allCode.COLOR)
        getCategoriesByIdRedux(categorieType.BAG_BALO)
        fetchAllCodeByTypeRedux(allCode.LOGO)
        fetchAllImageProductRedux(accessToken)
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
        }
        // getLimitProductsRedux(categorieType.BAG_BALO, params.get('page') ? params.get('page') : 1, accessToken)
    }, [])

    useEffect(() => {
        let strColor, strType, strLogo = ''
        const newArrOptionType = []
        const newArrOptionLogo = []
        const newArrColor = []
        arrColor.forEach(item => {
            if (optionColor[item]) {
                newArrColor.push(item.toUpperCase())
            }
        })
        arrOptionType.forEach(item => {
            if (optionType[item]) {
                let newOptionType = item === 'balo' ? listBag.BALO : listBag.BAG
                newArrOptionType.push(newOptionType)
            }
        })
        arrOptionLogo.forEach(item => {
            if (optionLogo[item]) 
                newArrOptionLogo.push(item)
        })
        if (newArrColor.length > 0) {
            strColor = newArrColor.toString()
        }
        if (newArrOptionType.length > 0) {
            strType = newArrOptionType.length > 1 ? '' : newArrOptionType.toString()
        }
        if (newArrOptionLogo.length > 0) {
            strLogo = newArrOptionLogo.toString()
        }
        const data = {
            optionType: strType ? strType : categorieType.BAG_BALO,
            colors: strColor,
            logos: strLogo
        }
        
        const optionTypeName = state?.typeName ? state?.typeName : ''

        if (optionTypeName && optionTypeName !== typeBagBalo.BALO_MLB) {
            getCategoriesByIdRedux(listBag.BAG)
            data['optionType'] = listBag.BAG
        }
        else if (optionTypeName && optionTypeName === typeBagBalo.BALO_MLB) {
            getCategoriesByIdRedux(listBag.BALO)
            data['optionType'] = listBag.BALO
        }
        else {
            getCategoriesByIdRedux(categorieType.BAG_BALO)
        }

        getLimitProductByOptionRedux(
            data, 
            params.get('page') ? params.get('page') : 1, 
            optionSort, 
            accessToken,
            optionTypeName
        )
        if (listRef.current) {
            window.scrollTo({
                behavior: "smooth",
                top: listRef.current.offsetTop
            });
        }

    }, [params.get('page'), optionSort, optionType, optionColor, optionLogo, state])
    
    const handleOnchangeTypeType = (e) => {
        let checked = e.target.getAttribute('for')
        if (checked === listBag.BALO) {
            setOptionType({
                ...optionType,
                balo: !optionType.balo
            })
        }
        else if (checked === listBag.BAG) {
            setOptionType({
                ...optionType,
                bag: !optionType.bag
            })
        }
    }
    
    const handleOnchangeColor = (e) => {
        let checked = e.target.getAttribute('for')
        optionColor[checked] = !optionColor[checked]
        setOptionColor({
            ...optionColor
        })
    }

    const handleOnchangeLogo = (e) => {
        let checked = e.target.getAttribute('for')
        optionLogo[checked] = !optionLogo[checked]
        setOptionLogo({
            ...optionLogo
        })
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
                            categoryProduct={categories[0]?.name} 
                            title={`mlb việt nam | ${categories[0]?.name} chính hãng tại việt nam`}
                        />
                        
                        <div className='shoes-body pt-5'>
                            <div className='shoes-container'>
                                <div className='row'>
                                    <div className='options col-3'>
                                        <div className='options-list ps-3'>
                                            <OptionSort handleSetOptionSort={setOptionSort} optionSort={optionSort} />
                                            <OptionType optionType={optionType} categories={categories} handleOnchangeTypeType={handleOnchangeTypeType} />
                                            <OptionColor colors={colors} handleOnchangeColor={handleOnchangeColor} optionColor={optionColor} />
                                            <OptionLogo handleOnchangeLogo={handleOnchangeLogo} logos={logos} optionType={optionType} />
                                        </div>
                                    </div>
                                    
                                    <div ref={listRef} className='shoes-list col-9'>
                                        <div className='shoes-list-container'>
                                            <div className='menu-product row'>
                                                <ListProducts products={products} images={images} />                                           
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Pagination pathPage={path.TUI_MLB} currentPage={params.get('page') || 1}/>
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        colors: state.product.colors,
        categories: state.product.categorieById,
        logos: state.product.logos,
        accessToken: state.auth.token,
        images: state.product.images,
        products: state.product.products,
        isLoading: state.product.isLoadingProduct,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        getCategoriesByIdRedux: (id) => dispatch(actions.getCategoriesById(id)),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByTypeProduct(type)),
        fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken)),
        getProductByCategoryRedux: (category) => dispatch(actions.getProductByCategory(category)),
        getLimitProductsRedux: (category, page, accessToken) => dispatch(actions.getLimitProducts(category, page, accessToken)),
        getLimitProductByOptionRedux: (optionData, page, option, accessToken, optionTypeName) => dispatch(actions.getLimitProductByOption(optionData, page, option, accessToken, optionTypeName)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(BagList));
