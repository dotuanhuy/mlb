import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { sliders } from '../../../utils/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import product1 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-c.jpg'
import product2 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-3.jpg'
import product3 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-4.jpg'
import product4 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-5.jpg'
import product5 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-6.jpg'
import product6 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-7.jpg'
import product7 from '../../../assets/Shoes/Shoes-NY/Chunky_Liner_Mid_New_York_Yankees_Green/mlb-8.jpg'
import './SliderProduct.scss'

function SliderProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='row'>
            <div className='col-2 d-flex'>
                <Swiper
                    direction='vertical'
                    onSwiper={setThumbsSwiper}
                    spaceBetween={5}
                    slidesPerView={8}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper w-75"           
                >
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product1} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product2} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product3} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product4} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product5} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product6} />
                    </SwiperSlide>
                    <SwiperSlide className='mb-2'>
                        <img className='h-100 w-100 object-fit-cover border border-secondary rounded' src={product7} />
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
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    <SwiperSlide>
                        <img className='w-100' src={product1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product3} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product4} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product5} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product6} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-100' src={product7} />
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
