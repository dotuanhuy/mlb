import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/mlb.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../utils';
import MLBOutfitChild from './MLBOutfitChild';


function MLBOutfit() {
    const [type, setType] = useState('Tshirt')

    return (
        <div className='mlboutfit pb-5 mb-5' style={{ background: '#f6f6f6' }}>
            <div className='mlboutfit-container px-4'>
                <div className='text-center py-5'>
                    <h2 className='title-option-homepage mb-4'>
                        <Link className='position-relative' to={path.OUTFIT_MLB}>MLB OUTFIT</Link>
                    </h2>
                    <p className='fw-bolder fs-16 text-muted'>Những bộ sưu tập <Link className='text-decoration-underline text-color-root-dark' to={path.OUTFIT_MLB}>OUTFIT MLB</Link> hot nhất</p>
                    <ul className='mlb-tabs row mt-4 justify-content-center mb-0 gap-2'>
                        <li
                            className={type === 'Tshirt' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Tshirt')}
                        >
                            <span>T-Shirt</span>
                        </li>
                        <li
                            className={type === 'Cap' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Cap')}
                        >
                            <span>Cap</span>
                        </li>
                        <li
                            className={type === 'Shorts' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Shorts')}
                        >
                            <span>Shorts</span>
                        </li>
                        <li
                            className={type === 'SkirtDress' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Skirt dress')}
                        >
                            <span>Skirt-Dress</span>
                        </li>
                    </ul>
                </div>
                <div className='menu-box'>
                    <MLBOutfitChild productTypeName={type} />
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
