import React, { useContext } from 'react'
import DataContext from './../../context/context'

const countHarmonicMean = (arr, atr) => {
    const parsedArr = arr.map((i, index) => parseFloat(i[atr])).filter((i, index) => !isNaN(i) && i)
    const denominator = parsedArr.reduce((acc, item) => acc + 1 / item, 0)
    return parsedArr.length ? parsedArr.length / denominator : 0
}

const HarmonicMean = () => {

    const { items } = useContext(DataContext)

    const price = countHarmonicMean(items, 'price')
    const countRating = countHarmonicMean(items, 'totalCountRating')
    const userRating = countHarmonicMean(items, 'userRating')
    const size = countHarmonicMean(items, 'size')

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h1 style={{ width: '100%' }}>
               Miara tendencji Centralnej: Średnia Harmoniczna
            </h1>
            <div>
                <h2>Średnia cena aplikacji: </h2>
                {price}
            </div>
            <div>
                <h2>Średnia suma oddanych ocen: </h2>
                {countRating}
            </div>
            <div>
                <h2>Średnia ocena: </h2>
                {userRating}
            </div>
            <div>
                <h2>Średni rozmiar aplikacji: </h2>
                {size}
            </div>
        </div>
    )
}
export default HarmonicMean