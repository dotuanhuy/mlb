import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Clothes.scss'
import { useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { 
    path, 
    categorieType, 
    listClothes, 
    allCode, 
    typeClothes,
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
const arrOptionType = ['SHIRT', 'DRESS1', 'SHORTS', 'DRESS2']
const arrOptionLogo = ['NY', 'B', 'LA', 'P', 'SF']

const initOptionType = {
    SHIRT: false,
    DRESS1: false,
    SHORTS: false,
    DRESS2: false
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

function Clothes({
    colors, 
    categories, 
    logos, 
    accessToken, 
    images,
    products,
    isLoading,
    fetchAllColorsRedux, 
    getCategoriesByIdRedux, 
    // fetchAllCodeByTypeRedux,
    getAllImagesByProductIdRedux,
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
    const { state } = useLocation();

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        fetchAllColorsRedux(allCode.COLOR)
        getCategoriesByIdRedux(categorieType.CLOTHES)
        // fetchAllCodeByTypeRedux(allCode.LOGO)
        getAllImagesByProductIdRedux(accessToken)        
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
        }
        // getProductByCategoryRedux(categorieType.SHOES_SANDAL)
        // getLimitProductsRedux(categorieType.SHOES_SANDAL, params.get('page') ? params.get('page') : 1, accessToken)
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
                newArrOptionType.push(listClothes[item])
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
            strType = newArrOptionType.length === 4 ? '' : newArrOptionType.toString()
        }
        if (newArrOptionLogo.length > 0) {
            strLogo = newArrOptionLogo.toString()
        }
        
        const data = {
            optionType: strType ? strType : categorieType.CLOTHES,
            colors: strColor,
            logos: strLogo
        }
        const optionTypeName = state?.typeName ? state?.typeName : ''

        if (optionTypeName && optionTypeName === typeClothes.OUTFIT_MLB_SHORTS) {
            getCategoriesByIdRedux(listClothes.SHORTS)
            data['optionType'] = listClothes.SHORTS
        }
        else if (optionTypeName && optionTypeName === typeClothes.OUTFIT_MLB_TSHIRT) {
            getCategoriesByIdRedux(listClothes.SHIRT)
            data['optionType'] = listClothes.SHIRT
        }
        else if (optionTypeName && optionTypeName === typeClothes.OUTFIT_MLB_SKIRT_DRESS) {
            let str = `${listClothes.DRESS1},${listClothes.DRESS2}`
            getCategoriesByIdRedux(str)
            data['optionType'] = str
        }
        else {
            getCategoriesByIdRedux(categorieType.CLOTHES)
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
        if (checked === listClothes.SHIRT) {
            setOptionType({
                ...optionType,
                SHIRT: !optionType.SHIRT
            })
        }
        else if (checked === listClothes.DRESS1) {
            setOptionType({
                ...optionType,
                DRESS1: !optionType.DRESS1
            })
        }
        else if (checked === listClothes.SHORTS) {
            setOptionType({
                ...optionType,
                SHORTS: !optionType.SHORTS
            })
        }
        else if (checked === listClothes.DRESS2) {
            setOptionType({
                ...optionType,
                DRESS2: !optionType.DRESS2
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

                                <Pagination pathPage={path.GIAY_MLB} currentPage={params.get('page') || 1}/>
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
        // fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByTypeProduct(type)),
        getAllImagesByProductIdRedux: (accessToken) => dispatch(actions.getAllImagesByProductId('', accessToken)),
        getProductByCategoryRedux: (category) => dispatch(actions.getProductByCategory(category)),
        getLimitProductsRedux: (category, page, accessToken) => dispatch(actions.getLimitProducts(category, page, accessToken)),
        getLimitProductByOptionRedux: (optionData, page, option, accessToken, optionTypeName) => dispatch(actions.getLimitProductByOption(optionData, page, option, accessToken, optionTypeName)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId))
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Clothes));
