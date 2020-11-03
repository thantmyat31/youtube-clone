import React from 'react';
import styles from './Selector.module.css';

const Selector = ({ selectItems, onChange }) => {
    return ( 
        <div className={styles.selectorContainer}>
            <select onChange={onChange}>
                {selectItems.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
            </select>
        </div>
     );
}
 
export default Selector;