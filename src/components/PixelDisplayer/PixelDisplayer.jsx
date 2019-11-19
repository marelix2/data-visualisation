import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import PhoneBackgorund from './components/PhoneBackgorund'
import utils from './utils'
import {chunk} from 'lodash'
import COLORS from './../../constants/colors'

const styles = {
    canvasWrapper : {
        border:'1px solid #444',
     borderRadius: 30,
      position: 'absolute',
       left: 530, 
       top: 64}
}




 const PixelDisplayer = ({phoneWidth, phoneHeight, backgorundFill}) => {
 
     const items = [
        {category: 'earth',
           number:'33',
           imgSrc: 'earth.svg',
           radius: '20',
           color: COLORS.ORANGE_2},
           {category: 'utils',
           number:'24',
           imgSrc: 'edit.svg'},
           {category: 'utils',
           number:'22',
           imgSrc: 'feature.svg'},
           {category: 'dev',
           number:'1',
           imgSrc: 'settings.svg',
           radius: '18',
       },
           {category: 'features',
           number:'14',
           imgSrc: 'console.svg',
           radius: '20',
           color: COLORS.RED},
           {category: 'utils',
           number:'22',
           imgSrc: 'earth.svg',
           color: COLORS.ORANGE},
           {category: 'earth',
           number:'33',
           imgSrc: 'earth.svg',
           radius: '20',
           color: COLORS.ORANGE_2},
           {category: 'utils',
           number:'24',
           imgSrc: 'edit.svg'},
           {category: 'utils',
           number:'22',
           imgSrc: 'feature.svg'},
           {category: 'dev',
           number:'1',
           imgSrc: 'settings.svg',
           radius: '18',
       },
           {category: 'features',
           number:'14',
           imgSrc: 'console.svg',
           radius: '20',
           color: COLORS.RED},
           {category: 'utils',
           number:'22',
           imgSrc: 'earth.svg',
           color: COLORS.ORANGE},
       ]

     const [canvas, setCanvas] = useState(null)
     
     useEffect(() => {
        setCanvas(document.getElementById('pixelCanvas').getContext('2d'))
     }, []);

     useEffect(() => {
        if(canvas) { 
        
        utils.fillBackbgorund(canvas)
        
        const chunks = chunk(items, 5)
            chunks.forEach((ch, index ) => {
                utils.drawRow(canvas, ch,  40, utils.getIconPosYOffset(index))
            })
        }
     }, [canvas])

    return (
        <>
        <svg id="svg2"  xmlns="http://www.w3.org/2000/svg" height="840" width="460" version="1.1" viewBox="0 0 690 1575">
        <PhoneBackgorund 
            backgorundFill={backgorundFill}
            phoneWidth={phoneWidth}
            phoneHeight={phoneHeight}
            />
        <rect id="rect4154" fillRule="evenodd" rx="25" ry="25" height="60" width="600" y="160" x="42" fill="#fff"/>
        </svg>

        <canvas
         id='pixelCanvas' 
        width='335'
         height='700' 
         style={styles.canvasWrapper}/>
        </>
    )
}

PixelDisplayer.propTypes = {
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

PixelDisplayer.defaultProps = {
    phoneWidth: 460,
    phoneHeight: 840,
    backgorundFill: '#fff'
}

export default PixelDisplayer