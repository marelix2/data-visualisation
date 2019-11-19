import COLORS from './../../constants/colors'
import {capitalize} from 'lodash'

const DEFAULT_WIDTH = 55
const DEFAULT_HEIGHT = 55
const DEFAULT_ICON_COLOR = '#000'
const DEFAULT_ICON_WIDTH = 35
const DEFAULT_ICON_HEIGHT = 35
const DEFAULT_NOTIFICATION_WIDTH = 14
const DEFAULT_NOTIFICATION_HEIGHT = 14

export const fillBackbgorund = canvas => {
    canvas.fillStyle = COLORS.IPHONE_BACKGROUND_COLOR
    canvas.fillRect(0,0,290,508);

    canvas.fillStyle = COLORS.IPHONE_BOTTOM_COLOR
    canvas.fillRect(0,450,290,508);

}

const getIconPosYOffset = index =>  20 + index * 80

export const getIconPosXOffset = index => index * 55 + index * 14

export const drawRow = (canvas, items,startingX, startingY) => {
    items.map((el, index) => drawIcon(canvas, startingX  + getIconPosXOffset(index), startingY, el))
}

const drawNotification = (canvas, startingX, startingY, item) => {

const notificationWidth = item.NotificationWidth || DEFAULT_NOTIFICATION_WIDTH
const notificationHeight = item.NotificationHeight || DEFAULT_NOTIFICATION_HEIGHT
canvas.fillStyle = COLORS.NOTIFY_ICON_COLOR
canvas.fillRect( startingX - 5, startingY - 5, notificationWidth, notificationHeight)
canvas.fillStyle = COLORS.TEXT_IPHONE
canvas.font='8px'
canvas.textAlign = 'center'
canvas.fillText(capitalize(item.number || 0), startingX + 2 ,startingY + notificationHeight/2.5)
}

const drawCategory = (canvas, startingX, startingY, item) => {
    canvas.fillStyle = COLORS.TEXT_IPHONE
    canvas.font='9px'
    canvas.textAlign = 'center'
    canvas.fillText(capitalize(item.category),  20 + startingX, 70 + startingY)
}

const drawInnerIcon = (canvas, posX, posY, item) => {
    canvas.fillStyle = DEFAULT_ICON_COLOR
    const img = new Image()
    const scale = item.width && item.width !== DEFAULT_WIDTH.toString() ?  (item.width / (DEFAULT_WIDTH + 40) )  : 1
 
    img.width= 150 * scale
   
    img.onload = () => {
        const IconPosX = posX + 10 * scale
        const IconPosY = posY + 10 * scale
        canvas.drawImage(img,IconPosX,IconPosY, DEFAULT_ICON_WIDTH, DEFAULT_ICON_HEIGHT)
    } 
    img.src=require(`./../../dist/svg/${item.imgSrc}`)
}

export const drawIcon =(canvas, posX, posY, item)  => {

    const width = item.width || DEFAULT_WIDTH
    const height = item.height || DEFAULT_HEIGHT

    //draw backgorund
    canvas.fillStyle = item.color || COLORS.GREEN
    canvas.fillRect( posX, posY, width, height)

    //draw icon
 
    drawInnerIcon(canvas, posX, posY, item)
   drawNotification(canvas, posX, posY, item)
   drawCategory(canvas, posX, posY, item)

  
}

export default {
    fillBackbgorund,
    drawIcon,
    drawRow,
    getIconPosYOffset
}