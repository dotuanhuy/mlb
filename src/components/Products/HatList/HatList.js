import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faCartShopping, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './HatList.scss'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { 
    path, 
    categorieType, 
    listHat, 
    listColor, 
    allCode, 
    typeHat,
} from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';
import {Buffer} from 'buffer';
import { formatVND } from '../../../utils';
import Pagination from '../../Paginations/Pagination'
import { useRef } from 'react';
import Loading from '../../Loading/Loading';

const arrColor = ['White', 'Black', 'Gray', 'Brown', 'Blue', 'Green', 'Pink', 'LightPink', 'Red', 'Orange', 'Yellow']
const arrOptionType = ['hat1', 'hat2']
const arrOptionLogo = ['NY', 'B', 'LA', 'P', 'SF']

const initOptionType = {
    hat1: false,
    hat2: false
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

function HatList({
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
    refreshIsloadingStateProductRedux
}) {
    const [typeSort, setTypeSort] = useState(true)
    const [typeType, setTypeType] = useState(true)
    const [typeColor, setTypeColor] = useState(true)
    const [typeLogo, setTypeLogo] = useState(true)
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
        getCategoriesByIdRedux(categorieType.HAT)
        fetchAllCodeByTypeRedux(allCode.LOGO)
        if (images.length === 0) {
            fetchAllImageProductRedux(accessToken)
        }
        // getLimitProductsRedux(categorieType.HAT, params.get('page') ? params.get('page') : 1, accessToken)
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
                let newOptionType = item === 'hat1' ? listHat.HAT1 : listHat.HAT2
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
            optionType: strType ? strType : categorieType.HAT,
            colors: strColor,
            logos: strLogo
        }

        const optionTypeName = state?.typeName ? state?.typeName : ''

        if (optionTypeName) {
            getCategoriesByIdRedux(listHat.HAT2)
            data['optionType'] = listHat.HAT2
        }
        else {
            getCategoriesByIdRedux(categorieType.HAT)
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
        if (checked === listHat.HAT1) {
            setOptionType({
                ...optionType,
                hat1: !optionType.hat1
            })
        }
        else if (checked === listHat.HAT2) {
            setOptionType({
                ...optionType,
                hat2: !optionType.hat2
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
                <div className='shoes'>
                    <Navbar />
                    <div className='shoes-header'>
                        <div className='title'>
                            MLB VIETNAM | TÚI MLB CHÍNH HÃNG TẠI VIỆT NAM
                        </div>
                        <ul className='list-link'>
                            <li className='item-link-home'>
                                <Link to='/'>Trang chủ</Link>
                            </li>
                            <li>
                                <span>Túi MLB</span>
                            </li>
                        </ul>
                    </div>
                    <div className='shoes-body pt-5'>
                        <div className='shoes-container'>
                            <div className='row'>
                                <div className='options col-3'>
                                    <div className='options-list ps-3'>
                                        <div className='option-together options-sort'>
                                            <div className='option-together-title mb-2'>
                                                Sắp xếp
                                                <span>
                                                    <FontAwesomeIcon 
                                                        icon={faAngleDown} 
                                                        className='action-down'
                                                        onClick={e => setTypeSort(!typeSort)}
                                                    />
                                                </span>
                                            </div>
                                            <div className={typeSort ? 'option-together-group' : 'option-together-group hiden-option'}>
                                                <ul>
                                                    <li>
                                                        <a onClick={e => setOptionSort('default')}>
                                                            <i className={optionSort === 'default' ? 'optionSelect' : ''}></i>
                                                            Mặc định
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={e => setOptionSort('AZ')}>
                                                            <i className={optionSort === 'AZ' ? 'optionSelect' : ''}></i>
                                                            Tên A-Z
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={e => setOptionSort('ZA')}>
                                                            <i className={optionSort === 'ZA' ? 'optionSelect' : ''}></i>
                                                            Tên Z-A
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={e => setOptionSort('lowToHigh')}>
                                                            <i className={optionSort === 'lowToHigh' ? 'optionSelect' : ''}></i>
                                                            Giá thấp đến cao
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a onClick={e => setOptionSort('highToLow')}>
                                                            <i className={optionSort === 'highToLow' ? 'optionSelect' : ''}></i>
                                                            Giá cao xuống thấp
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='option-together options-type'>
                                            <div className='option-together-title mb-2'>
                                                Loại SP
                                                <span>
                                                    <FontAwesomeIcon 
                                                        icon={faAngleDown} 
                                                        className='action-down'
                                                        onClick={e => setTypeType(!typeType)}
                                                    />
                                                </span>
                                            </div>
                                            <div className={typeType ? 'option-together-group' : 'option-together-group hiden-option'}>
                                                <ul>
                                                    {
                                                        categories && categories.length > 0 &&
                                                        categories.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <a>
                                                                        <input id={item.categoryId} type='checkbox' className={optionType ? 'optionSelect' : ''}/>
                                                                        <label 
                                                                            className='checkSS' 
                                                                            htmlFor={item.categoryId}
                                                                            onClick={(e) => handleOnchangeTypeType(e)}
                                                                        >
                                                                            {item.name}
                                                                        </label>
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    } 
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='option-together options-type'>
                                            <div className='option-together-title mb-2'>
                                                Màu sắc
                                                <span>
                                                    <FontAwesomeIcon 
                                                        icon={faAngleDown} 
                                                        className='action-down'
                                                        onClick={e => setTypeColor(!typeColor)}
                                                    />
                                                </span>
                                            </div>
                                            <div className={typeColor ? 'option-together-group' : 'option-together-group hiden-option'}>
                                                <ul>
                                                    {
                                                        colors && colors.length > 0 &&
                                                        colors.map((item, index) => {
                                                            return (
                                                                <li className='d-inline-block pe-2' key={index}>
                                                                    <a 
                                                                        className='colorType'                                                                 
                                                                        >
                                                                        <input 
                                                                            id={item.valueEn} 
                                                                            type='checkbox' />
                                                                        <label 
                                                                            className={`color${item.valueEn}`} 
                                                                            htmlFor={item.valueEn}
                                                                            onClick={(e) => handleOnchangeColor(e)}
                                                                        ></label>
                                                                        {
                                                                            item.valueEn === 'White' ? <FontAwesomeIcon icon={faCheck} className= {optionColor.White ? 'tick-color-white color-show' : 'tick-color-white color-hiden'} />
                                                                            : <FontAwesomeIcon icon={faCheck} className= { optionColor[`${item.valueEn}`] ? 'tick-color color-show' : 'tick-color color-hiden' } />
                                                                        }                                                            
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    }                                      
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='option-together options-type'>
                                            <div className='option-together-title mb-2'>
                                                Logo
                                                <span>
                                                    <FontAwesomeIcon 
                                                        icon={faAngleDown} 
                                                        className='action-down'
                                                        onClick={e => setTypeLogo(!typeLogo)}
                                                    />
                                                </span>
                                            </div>
                                            <div className={typeLogo ? 'option-together-group' : 'option-together-group hiden-option'}>
                                                <ul>
                                                    {
                                                        logos && logos.length > 0 &&
                                                        logos.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <a>
                                                                        <input id={item.keyMap} type='checkbox' className={ optionType ? 'optionSelect' : ''}/>
                                                                        <label 
                                                                            className='checkSS' 
                                                                            htmlFor={item.keyMap}
                                                                            onClick={(e) => handleOnchangeLogo(e)}
                                                                        >
                                                                            {item.valueEn}
                                                                        </label>
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    } 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div ref={listRef} className='shoes-list col-9'>
                                    <div className='shoes-list-container'>
                                        <div className='menu-product row'>
                                            {
                                                products && products.length > 0 &&
                                                products.map((item, index) => {
                                                    let imageBase64 = ''
                                                    let imageHoverBase64 = ''
                                                    let imageHover = images.find(image => image.productId === item.id)
                                                    let price = ''
                                                    if (item.image) {
                                                        imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                                    }
                                                    if (imageHover) {
                                                        imageHoverBase64 = Buffer.from(imageHover.image.data, 'base64').toString('binary')
                                                    }
                                                    if (item.price) {
                                                        price = formatVND(item.price)
                                                    }
                                                    return (
                                                        <div className='product col-4' key={index}>
                                                            {
                                                                item.dataDiscount.valueEn !== '0' ?
                                                                <div className='discount'>
                                                                    <span>-{item.dataDiscount.valueEn}</span>
                                                                </div>
                                                                : ''
                                                            }
                                                            <div className='actions text-center'>
                                                                <div className='tym mb-2 px-3'>
                                                                    <FontAwesomeIcon icon={faHeart} />
                                                                </div>
                                                                <div className='cart'>
                                                                    <button className='btn-buy'>
                                                                        <FontAwesomeIcon icon={faCartShopping} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className='product-img product-img-first'>
                                                                <a href='#'>
                                                                    <div 
                                                                        style={{ 
                                                                            maxWidth: '100%', 
                                                                            height: '340px',
                                                                            backgroundImage: `url(${imageBase64})`,
                                                                            backgroundPosition: '0% 0%',
                                                                            backgroundSize: 'cover',
                                                                            backgroundRepeat: 'no-repeat'
                                                                        }}
                                                                    ></div>
                                                                </a>
                                                            </div>        
                                                            <div className='product-img product-img-second'>
                                                                <a href='#'>
                                                                    <div 
                                                                        style={{ 
                                                                            maxWidth: '100%', 
                                                                            height: '340px',
                                                                            backgroundImage: `url(${imageHoverBase64})`,
                                                                            backgroundPosition: '0% 0%',
                                                                            backgroundSize: 'cover',
                                                                            backgroundRepeat: 'no-repeat'
                                                                        }}
                                                                    ></div>
                                                                </a>
                                                            </div>           
                                                            <div className='product-infor text-center'>
                                                                <span className='brand'>{item.dataBrand.valueEn}</span>    
                                                                <h4 className='product-name'>
                                                                    <a href='#'>{item.name}</a>
                                                                </h4>
                                                                <span className='product-price'>{price}</span>
                                                            </div>          
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Pagination pathPage={path.MU_NON_MLB} currentPage={params.get('page') || 1}/>
                        </div>
                    </div>
                </div>
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
        isLoading: state.product.isLoadingProduct
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
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(HatList));
