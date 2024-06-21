import React, { memo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../../../components/clients/navbar/Navbar';
import Banner from '../../../components/clients/banner/Banner';
import * as actions from '../../../store/actions'
import Loading from '../../../components/loading/Loading';

function TutorialSize({ titlePage }) {
    const dispatch = useDispatch()
    const { imageSizes, isLoading } = useSelector(state => state.firebase)

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.getSizeFirebase())
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
                                            <img src={item.url} />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(TutorialSize));
