import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Navbar from '../HomePage/Navbar/Navbar';
import Banner from '../common/Banners/Banner';
import * as actions from '../../store/actions'
import Loading from '../common/Loading/Loading';

function TutorialSize({
    titlePage,
    imageSizes,
    isLoading,
    getSizeFirebaseRedux
}) {

    useEffect(() => {
        document.title = titlePage
        getSizeFirebaseRedux()
    }, [])

    return (
        <>
            <Navbar />
            <div>
                <Banner categoryProduct='Size mlb' title='Size mlb' />
            </div>
            <div className='pt-4 text-center'>
                {
                    isLoading ? 
                    <Loading />
                    :
                    <>
                        {
                            imageSizes && imageSizes.length > 0 &&
                            imageSizes?.map((item, index) => {
                                return (
                                    <div key={index} className='mb-5 pb-4'>
                                        <div className='pb-3'>
                                            <span className='text-uppercase fs-5 fw-500 text-color-root-light text-decoration-underline'>{item.name.split('.').at(0)}</span>
                                        </div>
                                        <img src= {item.url}/>
                                    </div>
                                )
                            })
                        }
                    </>
                }
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        imageSizes: state.firebase.imageSizes,
        isLoading: state.firebase.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSizeFirebaseRedux: () => dispatch(actions.getSizeFirebase())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(TutorialSize));
