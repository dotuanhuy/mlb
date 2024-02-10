import React, { memo, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Option.scss';
import { ListColorsProduct } from "../../../utils";


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
                                <li 
                                    className='d-inline-block me-2 position-relative' 
                                    style={{ cursor: 'pointer' }}
                                    key={index}
                                    onClick={(e) => handleOnchangeColor(item.id)}
                                >
                                    {
                                        optionColor.some(element => element === item.id) ?
                                        <FontAwesomeIcon 
                                            icon={faCheck} 
                                            className={item.name === 'Trắng' ? "position-absolute text-black" : "position-absolute text-white"}
                                            style={{ 
                                                top: '7px',
                                                left: '9px',
                                                cursor: 'pointer'
                                            }}
                                        />   
                                        : ''            
                                    }
                                    <label 
                                        className={item.name === 'Trắng' ? 'rounded-circle border' : "rounded-circle"}
                                        style={{ 
                                            background: ListColorsProduct[item.name],
                                            border: `1px solid ${ListColorsProduct[item.name]}`,
                                            padding: '15px',
                                            cursor: 'pointer'
                                        }}
                                        htmlFor={item.name}
                                        data-toggle="tooltip" 
                                        title={item.name}
                                    ></label>   
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
        colors: state.color.colors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(OptionColor));
