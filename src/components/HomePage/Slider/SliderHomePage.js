import React from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { sliders } from '../../../utils/images';

function SliderHomePage({settings}) {

    return (
        <div className='SliderHomePage'>
            <div className='SliderHomePage-container'>
                <Slider {...settings}>  
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src={sliders.slider1}/>
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src={sliders.slider2}/>
                        </a>
                    </div>
                    <div className='section-slider'>
                        <a href='#'>
                            <img className='h-100 w-100' src={sliders.slider3}/>
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
