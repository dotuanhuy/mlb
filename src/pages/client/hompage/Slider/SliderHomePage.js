import React from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './sliderHomePage.scss'

function SliderHomePage({ settings }) {

    return (
        <div className='SliderHomePage'>
            <div className='SliderHomePage-container'>
                <Slider {...settings}>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src='https://firebasestorage.googleapis.com/v0/b/imagemlb.appspot.com/o/slider%2Fslider_1.webp?alt=media&token=9f93ceca-d3a2-4485-8f80-b24d5021145d' />
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src='https://firebasestorage.googleapis.com/v0/b/imagemlb.appspot.com/o/slider%2Fslider_2.webp?alt=media&token=d633089d-9900-4360-a047-a6d26ffa3ddf' />
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src='https://firebasestorage.googleapis.com/v0/b/imagemlb.appspot.com/o/slider%2Fslider_3.webp?alt=media&token=2b4a2027-64b4-43c0-bc6b-76bd21d9af68' />
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src='https://firebasestorage.googleapis.com/v0/b/imagemlb.appspot.com/o/slider%2Fslider_4.webp?alt=media&token=aaf8f6db-ee3e-4e79-ab7c-eb2290399fb1' />
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src='https://firebasestorage.googleapis.com/v0/b/imagemlb.appspot.com/o/slider%2Fslider_5.png?alt=media&token=31aa0616-4e45-492b-8e83-9a3fd28cdc47' />
                        </a>
                    </div>
                </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(SliderHomePage);
