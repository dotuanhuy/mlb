import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './MLBOutfit.scss'
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import TShirt from './TShirt/TShirt';
import Cap from './Cap/Cap'
import Shorts from './Shorts/Shorts';
import SkirtDress from './SkirtDress/SkirtDress';


function MLBOutfit() {
    const [type, setType] = useState('TShirt')

    return (
        <div className='mlboutfit'>
            <div className='mlboutfit-container px-4'>
                <div className='title text-center py-5'>
                    <h2 className='title-mlboutfit mb-4'>
                        <a href='#'>MLB OUTFIT</a>
                    </h2>
                    <p>Những bộ sưu tập <a href='#'>OUTFIT MLB</a> hot nhất</p>
                    <ul className='mlboutfit-tabs row my-4'>
                        <li 
                            className={type === 'TShirt' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('TShirt')}
                        >
                            <span>T-Shirt</span>
                        </li>
                        <li 
                            className={type === 'Cap' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('Cap')}
                        >
                            <span>Cap</span>
                        </li>
                        <li 
                            className={type === 'Shorts' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('Shorts')}
                        >
                            <span>Shorts</span>
                        </li>
                        <li 
                            className={type === 'SkirtDress' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('SkirtDress')}
                        >
                            <span>Skirt-Dress</span>
                        </li>
                    </ul>
                </div>
                <div className='menu-box'>
                    {
                        type === 'TShirt' ? <TShirt /> : ''
                    }
                    {
                        type === 'Cap' ? <Cap /> : ''
                    }
                    {
                        type === 'Shorts' ? <Shorts /> : ''
                    }
                    {
                        type === 'SkirtDress' ? <SkirtDress /> : ''
                    }
                </div>  
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MLBOutfit);
