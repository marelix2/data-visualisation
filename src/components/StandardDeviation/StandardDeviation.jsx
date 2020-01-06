import React, {useContext} from 'react'
import DataContext from './../../context/context'
import mean from 'lodash/mean'

export const countStandardDeviation = (arr, atr) => {
    const parsedArr = arr.map((i, index) => parseFloat(i[atr])).filter((i, index) => !isNaN(i) && i)
    const arrMean = mean(parsedArr)
    return parsedArr.length ? Math.sqrt(parsedArr.reduce((acc, i ) => acc + Math.pow( i - arrMean , 2)) / parsedArr.length) : 0
}

const StandardDeviation = () => {

    const { items } = useContext(DataContext)

    const price = countStandardDeviation(items, 'price')
    const countRating = countStandardDeviation(items, 'totalCountRating')
    const userRating = countStandardDeviation(items, 'userRating')
    const size = countStandardDeviation(items, 'size')

    
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 style={{ width: '100%' }}>
                   Miara zróżnicowania: Odchylenie Standardowe
                </h1>
                <div>
                    <h2>Odchylenie dla: cena aplikacji: </h2>
                    {price}
                </div>
                <div>
                    <h2>Odchylenie dla: suma oddanych ocen: </h2>
                    {countRating}
                </div>
                <div>
                    <h2>Odchylenie dla: Średnia ocena: </h2>
                    {userRating}
                </div>
                <div>
                    <h2>Odchylenie dla: Średni rozmiar aplikacji: </h2>
                    {size}
                </div>
            </div>
        )
}

export default StandardDeviation