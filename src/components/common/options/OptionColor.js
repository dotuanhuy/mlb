import React, { memo, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Option.scss';


function OptionColor({handleOnchangeColor, colors, optionColor}) {
    const [typeColor, setTypeColor] = useState(true)
    
    return (
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
    )
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(OptionColor));
