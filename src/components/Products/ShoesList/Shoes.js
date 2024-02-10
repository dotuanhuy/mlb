import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import './Shoes.scss'
import { useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { 
    path, 
    categorieType, 
    listShoesSandals, 
    listColor, 
    allCode, 
    typeShoesSandanl,
    ListColorsProduct,
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

function Shoes({
    typeName,
    categoryActive,
    colors, 
    categories, 
    logos, 
    accessToken, 
    images,
    products,
    isLoading,
    getAllColorsRedux, 
    getAllLogosRedux,
    getCategoriesByTypeRedux, 
    getImageProductByCategoryRedux,
    getLimitProductByOptionRedux,
    refreshIsloadingStateProductRedux,
    getAllProductsFavouriteRedux
}) {
    const [optionSort, setOptionSort] = useState('default')
    const [optionType, setOptionType] = useState([])
    const [optionColor, setOptionColor] = useState([])
    const [optionLogo, setOptionLogo] = useState([])
    const [params] = useSearchParams()
    const listRef = useRef()
    const { state } = useLocation();

    useEffect(() => {
        refreshIsloadingStateProductRedux()
        getAllColorsRedux(accessToken)
        getCategoriesByTypeRedux(categoryActive)
        getAllLogosRedux(accessToken)
        getImageProductByCategoryRedux(accessToken, categoryActive)

        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        if (userId) {
            getAllProductsFavouriteRedux(accessToken, userId)
        }
    }, [])

    useEffect(() => {
        
        const data = {
            optionType: optionType?.toString(',').length === 0 ? categoryActive : optionType?.toString(','),
            colors: optionColor?.toString(','),
            logos: optionLogo?.toString(','),
            typeName
        }
        // const optionTypeName = state?.typeName ? state?.typeName : ''

        // if (optionTypeName && optionTypeName !== typeShoesSandanl.DEP_MLB) {
        //     getCategoriesByTypeRedux(listShoesSandals.SHOES)
        //     data['optionType'] = listShoesSandals.SHOES
        // }
        // else if (optionTypeName && optionTypeName === typeShoesSandanl.DEP_MLB) {
        //     getCategoriesByTypeRedux(listShoesSandals.SANDAL)
        //     data['optionType'] = listShoesSandals.SANDAL
        // }
        // else {
        //     getCategoriesByTypeRedux(categorieType.SHOES_SANDAL)
        // }
        getLimitProductByOptionRedux(
            data, 
            params.get('page') ? params.get('page') : 1, 
            optionSort, 
            accessToken,
        )
        if (listRef.current) {
            window.scrollTo({
                behavior: "smooth",
                top: listRef.current.offsetTop
            });
        }

    }, [params.get('page'), optionSort, optionType, optionColor, optionLogo, typeName])


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
                            categoryProduct={categories?.name}
                            title={`mlb việt nam | ${categories?.name} chính hãng tại việt nam`}
                        />

                        <div className='shoes-body pt-5'>
                            <div className='shoes-container'>
                                <div className='row'>
                                    <div className='options col-3'>
                                        <div className='options-list ps-3'>
                                            <OptionSort handleSetOptionSort={setOptionSort} optionSort={optionSort} />
                                            <OptionType optionType={optionType} handleOnchangeTypeType={handleOnchangeTypeType} />
                                            <OptionColor handleOnchangeColor={handleOnchangeColor} optionColor={optionColor} />
                                            <OptionLogo handleOnchangeLogo={handleOnchangeLogo} optionType={optionType} />
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
        accessToken: state.auth.token,
        colors: state.color.colors,
        categories: state.category.categoryType,
        logos: state.logo.logos,
        images: state.image.images,
        products: state.product.products,
        isLoading: state.product.isLoadingProduct,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllColorsRedux: (accessToken) => dispatch(actions.getAllColors(accessToken)),
        getCategoriesByTypeRedux: (type) => dispatch(actions.getCategoriesByType(type)),
        getAllLogosRedux: (accessToken) => dispatch(actions.getAllLogos(accessToken)),
        getImageProductByCategoryRedux: (category, accessToken) => dispatch(actions.getmageProductByCategory(category, accessToken)),
        // fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByTypeProduct(type)),
        // getAllImagesByProductIdRedux: (accessToken) => dispatch(actions.getAllImagesByProductId('', accessToken)),
        getLimitProductsRedux: (category, page, accessToken) => dispatch(actions.getLimitProducts(category, page, accessToken)),
        getLimitProductByOptionRedux: (optionData, page, option, accessToken, optionTypeName) => dispatch(actions.getLimitProductByOption(optionData, page, option, accessToken, optionTypeName)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct()),
        getAllProductsFavouriteRedux: (accessToken, userId) => dispatch(actions.getAllProductsFavourite(accessToken, userId)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Shoes));
