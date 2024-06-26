import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './SliderProduct.scss'

function SliderProduct({product, images}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [listImages, setListImages] = useState([])
    const [active, setActive] = useState(0)

    useEffect(() => {
        let image, arr = []
        if (product?.image) {
            image = product?.image
        }
        if (images.length > 0) {
            arr = images.map(item => item.image)
        }
        setListImages([image, ...arr])
    }, [images, product])
    

    const handleChangeSilder = e => {
        setActive(+e.target.id)
    }    

    return (
        <div className='row'>
            <div className='col-2 d-flex'>
                <Swiper
                    direction='vertical'
                    onSwiper={setThumbsSwiper}
                    spaceBetween={1}
                    slidesPerView={11}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper w-100"           
                >   
                    {
                        listImages && listImages.length > 0 &&
                        listImages.map((item, index) => {
                            return (
                                <SwiperSlide className='mb-1' key={index}>
                                    <div 
                                        className={active === index ? 'rounded slider-product active' : 'rounded slider-product'}
                                        style={{ 
                                            maxWidth: '100%', 
                                            height: '100%',
                                            backgroundImage: `url(${item})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center'
                                        }}
                                        id={index}
                                        onClick={e => handleChangeSilder(e)}
                                    ></div>
                                </SwiperSlide>
                            )
                        })
                    }
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
                    {
                        listImages && listImages.length > 0 &&
                        listImages.map((item, index) => {
                            return (
                                <SwiperSlide className='mb-1' key={index}>
                                    <div 
                                        style={{ 
                                            maxWidth: '100%', 
                                            height: '60vh',
                                            backgroundImage: `url(${item})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>   
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        product: state.product.products,
        images: state.image.images,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(SliderProduct));
