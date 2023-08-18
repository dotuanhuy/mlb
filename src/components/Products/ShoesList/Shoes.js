import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCaretDown, faCartShopping, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { shoes, bag, hat, shirts, PK, logo, results } from '../../../utils/images';
import './Shoes.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import Navbar from '../../HomePage/Navbar/Navbar';

const initOptionType = {
    shoesMlb: false,
    sandal: false
}

function Shoes({colors, categories, fetchAllColorsRedux, getCategoriesByIdReduc}) {
    const [typeSort, setTypeSort] = useState(true)
    const [typeType, setTypeType] = useState(true)
    const [typeColor, setTypeColor] = useState(true)
    const [optionSort, setOptionSort] = useState('default')
    const [optionType, setOptionType] = useState(initOptionType)
    const [optionColor, setOptionColor] = useState('')

    useEffect(() => {
        fetchAllColorsRedux('COLOR')
        getCategoriesByIdReduc()
    }, [])

    const handleOnchangeTypeType = () => {
        setOptionType({
            ...optionType,
            shoesMlb: !optionType.shoesMlb
        })
        if (optionType.shoesMlb) {
            console.log('chuẩn')
        }
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
                                            <li>
                                                <a onClick={handleOnchangeTypeType}>
                                                    <input id='checkShoeMLB' type='checkbox' className={optionType.shoesMlb ? 'optionSelect' : ''}/>
                                                    <label className='checkSS' for='checkShoeMLB'>Giày MLB</label>
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={e => setOptionType({
                                                    ...optionType,
                                                    sandal: !optionType.sandal
                                                })}>
                                                    <input id='checkSandalMLB' type='checkbox' className={optionType.sandal ? 'optionSelect' : ''}/>
                                                    <label className='checkSS' for='checkSandalMLB'>Sandal MLB</label>
                                                </a>
                                            </li>
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
                                                        <li className='d-inline-block pe-2'>
                                                            <a 
                                                                className='colorType' 
                                                                onClick={e => setOptionColor(`${item.valueEn}`)}
                                                            >
                                                                <input 
                                                                    id={`checkColor${item.valueEn}`} 
                                                                    type='checkbox' className={optionColor === `${item.valueEn}` ? 'optionSelect' : ''}
                                                                />
                                                                <label 
                                                                    className={`color${item.valueEn}`} 
                                                                    for={`checkColor${item.valueEn}`}
                                                                    // onClick={}
                                                                ></label>
                                                                <FontAwesomeIcon icon={faCheck} className= {item.valueEn === 'White' ? 'tick-color-white' : 'tick-color'} />
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                            
                                            {/* <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorBlack' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorBlack' for='checkColorBlack'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li>
                                            <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorGray' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorGray' for='checkColorGray'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li>
                                            <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorBrow' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorBrow' for='checkColorBrow'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li>
                                            <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorBlue' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorBlue' for='checkColorBlue'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li>
                                            <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorGreen' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorGreen' for='checkColorGreen'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li>
                                            <li className='d-inline-block pe-2'>
                                                <a className='colorType' onClick={e => setOptionColor('black')}>
                                                    <input id='checkColorGreen' type='checkbox' className={optionColor === 'black' ? 'optionSelect' : ''}/>
                                                    <label className='colorGreen' for='checkColorGreen'></label>
                                                    <FontAwesomeIcon icon={faCheck} className='tick-color' />
                                                </a>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='shoes-list'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        colors: state.colors,
        categories: state.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        getCategoriesByIdReduc: (id) => dispatch(actions.getCategoriesById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shoes);
