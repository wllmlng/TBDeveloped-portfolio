//External Libraries
import React, { useState } from 'react';
//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './HoverInfo.module.scss'

//-----------------End Imports-----------------

interface Props {
    text?: string;
    children?: React.ReactNode;
 }

function HoverInfo({text, children}: Props) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div 
        className={styles.hoverContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div>
          {text}
        </div>
      )}
    </div>
    )
}

export default HoverInfo
