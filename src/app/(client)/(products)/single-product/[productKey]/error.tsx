"use client";

import Error from '@/app/(client)/components/common/error/ErrorComponent';
import React from 'react'

const error = (props: any) => {
    console.log(props);
    return <Error { ...props } />
}

export default error;