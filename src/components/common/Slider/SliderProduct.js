import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { sliders } from '../../../utils/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import product1 from '../../../assets/Shoes/Shoes-B/giay-mlb-bigball-chunky-p-mega-logo-boston-red-sox-ivory-3ashc2b2n-43rds-1/giay-1.jpg'
import product2 from '../../../assets/Shoes/Shoes-B/giay-mlb-bigball-chunky-p-mega-logo-boston-red-sox-ivory-3ashc2b2n-43rds-1/giay-2.jpg'
import product3 from '../../../assets/Shoes/Shoes-B/giay-mlb-bigball-chunky-p-mega-logo-boston-red-sox-ivory-3ashc2b2n-43rds-1/giay-3.jpg'

function SliderProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='row'>
            <div className='col-2 d-flex'>
                <Swiper
                direction='vertical'
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img className='h-10 w-100' src={product1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='h-10 w-100' src={product2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='h-10 w-100' src={product3} />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='col-10'>
                <Swiper 
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                        <img className='h-10 w-75' src={product1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='h-10 w-75' src={product2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='h-10 w-75' src={product3} />
                    </SwiperSlide>
                </Swiper>   
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(SliderProduct));
