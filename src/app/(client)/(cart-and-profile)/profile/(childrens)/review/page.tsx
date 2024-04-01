import React from 'react';
import ReviewTable from './ReviewTable';

const Reviews = () => {
    return (
        <div className='sm:px-4 px-2 sm:py-3 py-2 flex flex-col gap-5'>
            <div>
                <h3 className='text-lg font-semibold text-appTheme-600'>My Ratings & Reviews</h3>
            </div>

            {/* Reviews List */ }
            <ReviewTable />
        </div>
    );
};

export default Reviews;