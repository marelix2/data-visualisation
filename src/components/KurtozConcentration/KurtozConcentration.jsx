import React, {useContext} from 'react'
import { countStandardDeviation } from './../StandardDeviation/StandardDeviation'
import DataContext from './../../context/context'
import mean from 'lodash/mean'

const countKurt = (arr, atr) => {
    const parsedArr = arr.map((i, index) => parseFloat(i[atr])).filter((i, index) => !isNaN(i) && i)
    const SD = countStandardDeviation(arr, atr)
    const arrMean = mean(parsedArr)

    return parsedArr.length ? ((parsedArr.reduce((acc, i ) => acc + Math.pow( i - arrMean , 4)) / parsedArr.length) / Math.pow(SD, 4)) - 3 : 0
}

const getKurtType =  value => value === 0 ?  'Mezokurtyczny' : value >= 0 ? 'Leptokurtyczny' : 'Platykurtyczny'

const KurtozConcentration = () => {
    const { items } = useContext(DataContext)

const price = countKurt(items, 'price')
const countRating = countKurt(items, 'totalCountRating')
const userRating = countKurt(items, 'userRating')
const size = countKurt(items, 'size')

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{ width: '100%' }}>
               Miara koncentracji: Kurtoza
            </h1>
            <div>
                <h2>Kurtoza dla: cena aplikacji: </h2>
                <p>wynik jest: {getKurtType(price)}</p>
                {price}
            </div>
            <div>
                <h2>Kurtoza dla: suma oddanych ocen: </h2>
                <p>wynik jest: {getKurtType(countRating)}</p>
                {countRating} 
               
            </div>
            <div>
                <h2>Kurtoza dla: Średnia ocena: </h2>
                <p>wynik jest: {getKurtType(userRating)}</p>
                {userRating}
            </div>
            <div>
                <h2>Kurtoza dla: Średni rozmiar aplikacji: </h2>
                <p>wynik jest: {getKurtType(size)}</p>
                {size}
            </div>
        </div>
    )
}

export default KurtozConcentration