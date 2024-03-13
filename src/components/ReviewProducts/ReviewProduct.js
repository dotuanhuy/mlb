import React, { memo } from 'react';
import { connect } from 'react-redux';

function ReviewProduct() {


    return (
        <div className='border rounded col-10'>
            <div className='py-5 text-center'>
                <p className='text-muted'>Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này</p>
                <button className='btn btn-sub' >Gửi đánh giá của bạn</button>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(ReviewProduct));
