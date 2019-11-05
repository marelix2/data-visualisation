import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import PhoneBackgorund from './components/PhoneBackgorund'
import COLORS from './../../constants/colors'

const drawIcon =(canvas, posX, posY)  => {

     canvas.fillStyle = posX % 2 ? COLORS.ORANGE : COLORS.GREEN
     canvas.fillRect( posX, posY, 55, 55)

    canvas.fillStyle = '#000'
    const img = new Image()

    img.width=150
    img.onload = () => {
        canvas.drawImage(img,posX + 10,posY + 10, 35, 35)
    } 
    img.src=require('./../../dist/svg/earth.svg')

    canvas.fillStyle = COLORS.TEXT_IPHONE
    canvas.font='10px Roboto'
    canvas.fillText('Kategoria',  7 + posX, 70 + posY)
}

const drawRow = (canvas, posX, posY) => {
    ['', '', '', ''].map((el, index) => drawIcon(canvas, posX + index * 55 + index * 14, posY))
}

const fillBackbgorund = canvas => {
    canvas.fillStyle = '#FF4E52'
    canvas.fillRect(0,0,290,508);

    canvas.fillStyle = COLORS.RED
    canvas.fillRect(0,450,290,508);

}

 const IphoneDisplayer = ({phoneWidth, phoneHeight, backgorundFill}) => {

    const [canvas, setCanvas] = useState(null)
     
     useEffect(() => {
        setCanvas(document.getElementById('canvas').getContext('2d'))
     }, []);

     useEffect(() => {
        if(canvas) { 
        fillBackbgorund(canvas)

        drawRow(canvas, 14, 20)
        drawRow(canvas, 14, 100)
        drawRow(canvas, 14, 180)
        drawRow(canvas, 14, 260)
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
         <canvas id='canvas' width='290' height='508' style={{border:'1px solid #E9494C', borderRadius: 3, position: 'absolute', left: 88, top: 132}}></canvas>
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