import React from 'react';
import Dropzone from 'react-dropzone';

import { BsPlus } from "react-icons/bs";
import styles from './ItemDropzone.module.css';

const ItemDropzone = ({ onDrop }) => {
    return ( 
        <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps}) => (
                <div className={styles.dropzoneContainer}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <BsPlus className={styles.icon} />
                    </div>
                </div>
            )}
        </Dropzone>
     );
}
 
export default ItemDropzone;