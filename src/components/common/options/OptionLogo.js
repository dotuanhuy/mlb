import React, { memo, useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Option.scss';

function OptionLogo({handleOnchangeLogo, logos, optionType}) {
    const [typeLogo, setTypeLogo] = useState(true)
    
    return (
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
                                        <input id={item.type} type='checkbox' className={ optionType ? 'optionSelect' : ''}/>
                                        <label 
                                            className='checkSS' 
                                            htmlFor={item.type}
                                            onClick={(e) => handleOnchangeLogo(item.id)}
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
        logos: state.logo.logos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(OptionLogo));
