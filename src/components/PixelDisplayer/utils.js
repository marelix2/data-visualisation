import COLORS from './../../constants/colors'
import {capitalize} from 'lodash'

const DEFAULT_RADIUS = 24
const DEFAULT_ICON_COLOR = '#000'
const DEFAULT_ICON_WIDTH = 25
const DEFAULT_ICON_HEIGHT = 25
const DEFAULT_NOTIFICATION_WIDTH = 12
const DEFAULT_NOTIFICATION_HEIGHT = 12

const getIconPosYOffset = index =>  120 + index * 100

export const getIconPosXOffset = index => index * 48 + index * 14

export const drawIcon =(canvas, posX, posY, item)  => {

    const radius = item.radius || DEFAULT_RADIUS
   
    canvas.fillStyle = item.color ||  COLORS.GREEN
    canvas.beginPath();
    canvas.arc(posX, posY, radius, 0, 2 * Math.PI, false);
    canvas.fill();
    
   drawInnerIcon(canvas, posX, posY, item)
   drawNotification(canvas, posX, posY, item)
   drawCategory(canvas, posX, posY, item)
}


const drawCategory = (canvas, startingX, startingY, item) => {
    canvas.fillStyle = COLORS.TEXT_PIXEL
    canvas.font = "8px Arial"
    canvas.textAlign = 'center'
    canvas.fillText(capitalize(item.category),  startingX, startingY + 45)
}

export const drawRow = (canvas, items, posX, posY) => {
   items.map((el, index) => drawIcon(canvas, posX  + getIconPosXOffset(index), posY, el))
}

const drawInnerIcon = (canvas, posX, posY, item) => {
    canvas.fillStyle = DEFAULT_ICON_COLOR
    const img = new Image()
    const scale = item.radius && item.radius !== DEFAULT_RADIUS.toString() ?  (item.radius / (DEFAULT_RADIUS - 3) )  : 1
 
    img.width= 150 * scale
   
    img.onload = () => {
        const IconPosX = posX - 13 * scale
        const IconPosY = posY - 12 * scale
        canvas.drawImage(img,IconPosX,IconPosY, DEFAULT_ICON_WIDTH, DEFAULT_ICON_HEIGHT)
    } 
    try {
        img.src=require(`./../../dist/svg/${item.imgSrc}`)
    }catch {
        img.src=require(`./../../dist/svg/Utilities.svg`)
    }
    
}

const drawNotification = (canvas, startingX, startingY, item) => {

    const notificationWidth = item.NotificationWidth || DEFAULT_NOTIFICATION_WIDTH
    const notificationHeight = item.NotificationHeight || DEFAULT_NOTIFICATION_HEIGHT
    canvas.fillStyle = COLORS.NOTIFY_ICON_COLOR
    canvas.fillRect( startingX - 25, startingY - 25, notificationWidth, notificationHeight)
    canvas.fillStyle = COLORS.TEXT_IPHONE
    canvas.font = "9px Arial"
    canvas.textAlign = 'center'
    canvas.fillText(capitalize(item.number || 0), startingX -19 ,startingY - notificationHeight/0.8)
    }

export const fillBackbgorund = canvas => {
   canvas.fillStyle = '#ddd'
   canvas.fillRect(0,0,340,700);
}


export default {
    fillBackbgorund,
    drawIcon,
    drawRow,
    getIconPosYOffset
}