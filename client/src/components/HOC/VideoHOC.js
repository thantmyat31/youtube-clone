import React from 'react';
import Loading from '../Loading/Loading';

const VideoHOC = (WrapperComponent) => ({ isLoading, ...rest }) => {
    if(isLoading) return <Loading />

    return <WrapperComponent {...rest} />
}
 
export default VideoHOC;