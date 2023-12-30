import React, { memo, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './Option.scss';

function OptionType({handleOnchangeTypeType, categories, optionType}) {
    const [typeType, setTypeType] = useState(true)
    
    return (
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(OptionType));
