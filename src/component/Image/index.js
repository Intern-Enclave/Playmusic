import React, { useState } from 'react';
import { forwardRef } from 'react';

import images from '../../assets/img'

const Image = forwardRef(({src, alt,className,...props}, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(images.noImage)
    }

    return (
      <img className={className} ref={ref} src={!src && src || fallback} alt={alt} {...props} onError={handleError} />
    );
})

export default Image;