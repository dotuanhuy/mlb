import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {  faCartShopping, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Shoes.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path, categorieType, listShoesSandals, listColor, allCode } from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';
import {Buffer} from 'buffer';
import { formatVND } from '../../../utils';

const initOptionType = {
    shoesMlb: false,
    sandal: false
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

function Shoes({
    colors, 
    categories, 
    logos, 
    accessToken, 
    images,
    products,
    fetchAllColorsRedux, 
    getCategoriesByIdRedux, 
    fetchAllCodeByTypeRedux,
    fetchAllImageProductRedux,
    getProductByCategoryRedux
}) {
    const [typeSort, setTypeSort] = useState(true)
    const [typeType, setTypeType] = useState(true)
    const [typeColor, setTypeColor] = useState(true)
    const [typeLogo, setTypeLogo] = useState(true)
    const [optionSort, setOptionSort] = useState('default')
    const [optionType, setOptionType] = useState(initOptionType)
    const [optionColor, setOptionColor] = useState(initOptionColor)
    const [optionLogo, setOptionLogo] = useState(initOptionLogo)

    useEffect(() => {
        fetchAllColorsRedux(allCode.COLOR)
        getCategoriesByIdRedux(categorieType.SHOES_SANDAL)
        fetchAllCodeByTypeRedux(allCode.LOGO)
        if (images.length === 0) {
            fetchAllImageProductRedux(accessToken)
        }
        getProductByCategoryRedux(categorieType.SHOES_SANDAL)
    }, [])

    const handleOnchangeTypeType = (e) => {
        let checked = e.target.getAttribute('for')
        if (checked === listShoesSandals.SHOES) {
            setOptionType({
                ...optionType,
                shoesMlb: !optionType.shoesMlb
            })
        }
        else if (checked === listShoesSandals.SANDAL) {
            setOptionType({
                ...optionType,
                sandal: !optionType.sandal
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
        <div className='shoes'>
            <Navbar />
            <div className='shoes-header'>
                <div className='title'>
                    MLB VIETNAM | GIÀY MLB CHÍNH HÃNG TẠI VIỆT NAM
                </div>
                <ul className='list-link'>
                    <li className='item-link-home'>
                        <Link to='/'>Trang chủ</Link>
                    </li>
                    <li>
                        <span>Giày MLB</span>
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
                        
                        <div className='shoes-list col-9'>
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
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        colors: state.product.colors,
        categories: state.product.categorieById,
        logos: state.product.logos,
        accessToken: state.auth.token,
        images: state.product.images,
        products: state.product.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        getCategoriesByIdRedux: (id) => dispatch(actions.getCategoriesById(id)),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByTypeProduct(type)),
        fetchAllImageProductRedux: (accessToken) => dispatch(actions.fetchAllImageProduct('', accessToken)),
        getProductByCategoryRedux: (category) => dispatch(actions.getProductByCategory(category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoes);
