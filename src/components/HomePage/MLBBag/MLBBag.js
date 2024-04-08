import React, { useState } from 'react';
import { connect } from 'react-redux';
import './MLBBag.scss'
import CrossBag from './CrossBag/CrossBag';
import Bucketbag from './BucketBag/Bucketbag';
import HipStack from './HipStack/HipStack';
import HoboBag from './HoboBag/HoboBag';
import ToteBag from './ToteBag/ToteBag';
import PhonePouch from './PhonePouch/PhonePouch';
import { Link } from 'react-router-dom';
import { path } from '../../../utils';

function MLBBag() {
    const [type, setType] = useState('CrossBag')

    return (
        <div className='mlbbag'>
            <div className='mlbbag-container px-4'>
                <div className='title text-center py-5'>
                    <h2 className='title-mlbbag mb-4'>
                        <Link to={path.TUI_MLB}>MLB BAG</Link>
                    </h2>
                    <p>Những bộ sưu tập <Link to={path.TUI_MLB}>Túi MLB</Link> hot nhất</p>
                    <ul className='mlbbag-tabs row my-4'>
                        <li 
                            className={type === 'CrossBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('CrossBag')}
                        >
                            <span>Cross Bag</span>
                        </li>
                        <li 
                            className={type === 'BucketBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('BucketBag')}
                        >
                            <span>Bucket Bag</span>
                        </li>
                        <li 
                            className={type === 'HipStack' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('HipStack')}
                        >
                            <span>Hip Stack</span>
                        </li>
                        <li 
                            className={type === 'HoboBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('HoboBag')}
                        >
                            <span>Hobo Bag</span>
                        </li>
                        <li 
                            className={type === 'ToteBag' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('ToteBag')}
                        >
                            <span>Tote Bag</span>
                        </li>
                        <li 
                            className={type === 'PhonePouch' ? 'tab col-1 tab-current' : 'tab col-1'}
                            onClick={e => setType('PhonePouch')}
                        >
                            <span>Phone Pouch</span>
                        </li>
                    </ul>
                </div>
                <div className='menu-box'>
                    {
                        type === 'CrossBag' ? <CrossBag /> : ''
                    }
                    {
                        type === 'BucketBag' ? <Bucketbag /> : ''
                    }
                    {
                        type === 'HipStack' ? <HipStack /> : ''
                    }
                    {
                        type === 'HoboBag' ? <HoboBag /> : ''
                    }
                    {
                        type === 'ToteBag' ? <ToteBag /> : ''
                    }
                    {
                        type === 'PhonePouch' ? <PhonePouch /> : ''
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

export default connect(mapStateToProps, mapDispatchToProps)(MLBBag);
