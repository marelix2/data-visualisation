import React, {useEffect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import PhoneBackgorund from './components/PhoneBackgorund'
import utils from './utils'
import {chunk} from 'lodash'
import COLORS from './../../constants/colors'

import DataContext from './../../context/context'

const styles = {
    canvasWrapper : {
        border:'1px solid #E9494C',
     borderRadius: 3,
      position: 'absolute',
       left: 88,
        top: 132
    }
}

 const IphoneDisplayer = ({phoneWidth, phoneHeight, backgorundFill}) => {
    const {iphoneDisplayerItems} = useContext(DataContext)
    const [canvas, setCanvas] = useState(null)
     
     useEffect(() => {
        setCanvas(document.getElementById('canvas').getContext('2d'))
     }, []);

     useEffect(() => {
        if(canvas) { 
        utils.fillBackbgorund(canvas)
        
        const chunks = chunk(iphoneDisplayerItems, 4)
            chunks.forEach((ch, index ) => {
                utils.drawRow(canvas, ch,  14, utils.getIconPosYOffset(index))
            })
        }
     }, [canvas])

    return (
        <>
         <svg version="1.1" x="0" y="0" width={phoneWidth} height={phoneHeight}
	          viewBox="360 40 480 932" enableBackground="new 0 0 480 900">
        
            <PhoneBackgorund 
            backgorundFill={backgorundFill}
            phoneWidth={phoneWidth}
            phoneHeight={phoneHeight}
            />
         </svg>
         <canvas 
         id='canvas'
          width='290'
           height='508'
            style={styles.canvasWrapper} />
        </>
    )
}

IphoneDisplayer.propTypes = {
    phoneWidth:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]), 
    phoneHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    backgorundFill: PropTypes.string 
}

IphoneDisplayer.defaultProps = {
    phoneWidth: 460,
    phoneHeight: 840,
    backgorundFill: '#000'
}

export default IphoneDisplayer