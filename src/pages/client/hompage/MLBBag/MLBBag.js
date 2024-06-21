import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../styles/mlb.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../../utils';
import MLBBagChild from './MLBBagChild';

function MLBBag() {
    const [type, setType] = useState('Cross bag')

    return (
        <div className='mlbbag pb-5 mb-5' style={{ background: '#f6f6f6' }}>
            <div className='mlbbag-container px-4'>
                <div className='text-center py-5'>
                    <h2 className='title-option-homepage mb-4'>
                        <Link className='position-relative' to={path.TUI_MLB}>MLB BAG</Link>
                    </h2>
                    <p className='fw-bolder fs-16 text-muted'>Những bộ sưu tập <Link className='text-decoration-underline text-color-root-dark' to={path.TUI_MLB}>Túi MLB</Link> hot nhất</p>
                    <ul className='mlb-tabs row mt-4 justify-content-center mb-0 gap-2'>
                        <li
                            className={type === 'Cross bag' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Cross bag')}
                        >
                            <span>Cross Bag</span>
                        </li>
                        <li
                            className={type === 'Bucket bag' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Bucket bag')}
                        >
                            <span>Bucket Bag</span>
                        </li>
                        <li
                            className={type === 'Hip sack' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Hip sack')}
                        >
                            <span>Hip Sack</span>
                        </li>
                        <li
                            className={type === 'Hobo bag' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Hobo bag')}
                        >
                            <span>Hobo Bag</span>
                        </li>
                        <li
                            className={type === 'Tote bag' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Tote bag')}
                        >
                            <span>Tote Bag</span>
                        </li>
                        <li
                            className={type === 'Phone pouch' ? 'text-center py-2 col-1 tab-current rounded' : 'tab rounded text-center py-2 col-1'}
                            style={{ cursor: 'pointer' }}
                            onClick={e => setType('Phone pouch')}
                        >
                            <span>Phone Pouch</span>
                        </li>
                    </ul>
                </div>
                <div className='menu-box'>
                    <MLBBagChild productTypeName={type} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBag);
