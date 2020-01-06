import React, { useContext } from 'react'
import DataContext from './../../context/context'
import { countStandardDeviation } from './../StandardDeviation/StandardDeviation'
import mean from 'lodash/mean'

const countTrindMoment = (arr, atr) => {
    const parsedArr = arr.map((i, index) => parseFloat(i[atr])).filter((i, index) => !isNaN(i) && i)
    const arrMean = mean(parsedArr)
    return parsedArr.length ? (parsedArr.reduce((acc, i) => acc + Math.pow(i - arrMean, 3)) / parsedArr.length) : 0
}

const countAsymmetryFactor = (items, atr) => {
    const thrindMoment = countTrindMoment(items, atr)
    const SD = countStandardDeviation(items, atr)

    return thrindMoment / Math.pow(SD, 3)
}


const AsymmetryMeasure = () => {

    const { items } = useContext(DataContext)

    const price = countAsymmetryFactor(items, 'price')
    const countRating = countAsymmetryFactor(items, 'totalCountRating')
    const userRating = countAsymmetryFactor(items, 'userRating')
    const size = countAsymmetryFactor(items, 'size')



    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{ width: '100%' }}>
                Miara Asymetrii : współczynnik asymetrii

            </h1>
            <div>
                <h2>współczynnik asymetrii dla: cena aplikacji: </h2>
                {price}
            </div>
            <div>
                <h2>współczynnik asymetrii dla: suma oddanych ocen: </h2>
                {countRating}

            </div>
            <div>
                <h2>współczynnik asymetrii dla: Średnia ocena: </h2>
                {userRating}
            </div>
            <div>
                <h2>współczynnik asymetrii dla: Średni rozmiar aplikacji: </h2>
                {size}
            </div>
        </div>
    )
}

export default AsymmetryMeasure