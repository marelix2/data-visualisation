import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import PhoneBackgorund from './components/PhoneBackgorund'
import COLORS from './../../constants/colors'

const drawIcon =(canvas, posX, posY)  => {

    canvas.fillStyle = posX % 2 ? COLORS.ORANGE : COLORS.GREEN
    canvas.beginPath();
    canvas.arc(posX, posY, 24, 0, 2 * Math.PI, false);
    canvas.fill();

   canvas.fillStyle = '#000'
   const img = new Image()

   img.width=150
   img.onload = () => {
       canvas.drawImage(img,posX - 13,posY - 12, 25, 25)
   } 
   img.src=require('./../../dist/svg/earth.svg')

   canvas.fillStyle = COLORS.TEXT_PIXEL
   canvas.font='10px Roboto'
   canvas.fillText('Kategoria', posX - 21, posY + 50)
}

const drawRow = (canvas, posX, posY) => {
   ['', '', '', '', ''].map((el, index) => drawIcon(canvas, posX + index * 48 + index * 14, posY))
}

const fillBackbgorund = canvas => {
   canvas.fillStyle = '#ddd'
   canvas.fillRect(0,0,340,700);
}



 const PixelDisplayer = ({phoneWidth, phoneHeight, backgorundFill}) => {
     const defaultRowProps = {
        size:90,
        space:28,
        rx: '50%',
        ry:'50%',
        textXOffset: 32,
        textYOffsetL: 120,
     }

     const [canvas, setCanvas] = useState(null)
     
     useEffect(() => {
        setCanvas(document.getElementById('pixelCanvas').getContext('2d'))
     }, []);

     useEffect(() => {
        if(canvas) { 
        fillBackbgorund(canvas)

        drawRow(canvas, 40, 120)
        drawRow(canvas, 40, 220)
        drawRow(canvas, 40, 320)
        drawRow(canvas, 40, 420)
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

        <canvas id='pixelCanvas' width='335' height='700' style={{border:'1px solid #444', borderRadius: 30, position: 'absolute', left: 530, top: 64}}></canvas>
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