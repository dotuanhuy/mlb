import React, { memo, useState } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './Option.scss';

function OptionSort({ handleSetOptionSort, optionSort }) {
    const [typeSort, setTypeSort] = useState(true)

    return (
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
                        <a onClick={e => handleSetOptionSort('default')}>
                            <i className={optionSort === 'default' ? 'optionSelect' : ''}></i>
                            Mặc định
                        </a>
                    </li>
                    <li>
                        <a onClick={e => handleSetOptionSort('AZ')}>
                            <i className={optionSort === 'AZ' ? 'optionSelect' : ''}></i>
                            Tên A-Z
                        </a>
                    </li>
                    <li>
                        <a onClick={e => handleSetOptionSort('ZA')}>
                            <i className={optionSort === 'ZA' ? 'optionSelect' : ''}></i>
                            Tên Z-A
                        </a>
                    </li>
                    <li>
                        <a onClick={e => handleSetOptionSort('lowToHigh')}>
                            <i className={optionSort === 'lowToHigh' ? 'optionSelect' : ''}></i>
                            Giá thấp đến cao
                        </a>
                    </li>
                    <li>
                        <a onClick={e => handleSetOptionSort('highToLow')}>
                            <i className={optionSort === 'highToLow' ? 'optionSelect' : ''}></i>
                            Giá cao xuống thấp
                        </a>
                    </li>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(OptionSort));
