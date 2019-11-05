import React from 'react'
import PropTypes from 'prop-types'
import COLORS from './../../constants/colors'
import EarthIcon from './../../constants/icons/earth';

const AppIcon = ({index, title ,xPos, yPos, ...otherProps}) => ( 
    <>
    <EarthIcon/>
    <rect 
    id={`${index}-app`} 
     fillRule="evenodd" 
     rx={otherProps.rx}
     ry={otherProps.ry}
     height={otherProps.size} 
     width={otherProps.size}
      y={yPos}
      x={xPos + index * otherProps.size + index * otherProps.space}
      fill={index % 3 ? COLORS.ORANGE :otherProps.fill}/>

      <text 
        x={xPos + index * otherProps.size + index * otherProps.space + otherProps.textXOffset}
        y={yPos + otherProps.textYOffsetL} 
        style={{fontSize: '16px !important'}}>
       {title || 'title'}
       </text>
</>
)

AppIcon.propTypes = {

}

AppIcon.defaultProps = {
    rx: 5,
    ry: 5,
    size: 60,
    space: 15,
    textXOffset: 15,
    textYOffsetL: 78,
    fill: COLORS.GREEN
}

export default AppIcon