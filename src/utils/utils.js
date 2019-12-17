import COLORS from './../constants/colors'
import _ from 'lodash'

export const getCategories = (items) => [...new Set(items.map(item => item.category))].filter(_ => _)

export const getItems = (items, env) => items.filter(item => item.environment === env)

const getSupportedDevicesPercentage = (items, category, maxValue) => {
    const supportedDevices = items.filter(item => item.category === category)
    const avg = Math.floor(supportedDevices.reduce((acc, { numberOfSupportedDevices }) => acc + parseInt(numberOfSupportedDevices), 0) / supportedDevices.length)

    return Math.floor(avg / maxValue * 100)
}

const getSupportedDevicesPercentageAndroid = (items, category, supportDivicesAndroid) => {
    let supportedDevices = items.filter(item => item.category === category).map(d => d.numberOfSupportedDevices).sort((a, b) => a - b)
    const occurances = {}
    supportedDevices.forEach(a => {
        if (occurances[a] !== undefined) occurances[a] += 1
        else occurances[a] = 0
    })
    const keys = Object.keys(occurances)
    let max = 0
    let mostPopularVersion

    keys.forEach(key => {
        if (max < occurances[key]) {
            max = occurances[key]
            mostPopularVersion = key
        }
    })
    let androidKeys = Object.keys(supportDivicesAndroid)
    androidKeys = androidKeys.slice(androidKeys.indexOf(mostPopularVersion))
    return Math.floor(androidKeys.reduce((result, key) => result + supportDivicesAndroid[key], 0))
}


const getAvergeCostOfApp = (items, category) => Math.floor(getAverge(items, category, 'price'))

const getAverge = (items, category, key) => {
    const categoryItems = items.filter(item => item.category === category)
    return categoryItems.reduce((acc, item) => acc + parseFloat(item[key]), 0) / categoryItems.length
}

const getColorByPrice = (items, category, price) => {
    const i = items.filter(item => item.category === category).map(item => item.price).sort((a, b) => a - b)
    const firstCentile = parseFloat(i[Math.floor(i.length * 0.25)])
    const secondCentile = parseFloat(i[Math.floor(i.length * 0.5)])
    const trindCentile = parseFloat(i[Math.floor(i.length * 0.75)])


    if (firstCentile >= price) return COLORS.GREEN
    if (firstCentile <= price && secondCentile > price) return COLORS.YELLOW
    if (secondCentile <= price && trindCentile > price) return COLORS.ORANGE

    return COLORS.RED
}

const parseCategoryName = category => `${category.split(' ').join('')}.svg`

const calculateSizeOfOverallIconIOS = (items, category) => {
    const DEFAULT_WIDTH = 55

    const size = getAverge(items, category, 'size')
    const i = items.filter(item => item.category === category).map(item => item.size).sort((a, b) => a - b)

    const firstCentile = i[Math.floor(i.length * 0.25)]
    const secondCentile = i[Math.floor(i.length * 0.5)]
    const trindCentile = i[Math.floor(i.length * 0.75)]

    if (firstCentile > size) return 44
    if (firstCentile <= size && secondCentile > size) return 50

    return DEFAULT_WIDTH
}

const calculateSizeOfInnerIconIOS = (items, category) => {
    const totalRating = getAverge(items, category, 'totalCountRating')
    const i = items.filter(item => item.category === category).map(item => item.totalCountRating).sort((a, b) => a - b)

    const firstCentile = i[Math.floor(i.length * 0.25)]
    const secondCentile = i[Math.floor(i.length * 0.5)]
    const trindCentile = i[Math.floor(i.length * 0.75)]

    if (firstCentile > totalRating) return 24
    if (firstCentile <= totalRating && secondCentile > totalRating) return 30
    return 35
}

const calculateSizeOfOverallIconAndroid = (items, category) => {
    const DEFAULT_RADIUS = 24

    const size = getAverge(items, category, 'size')
    const i = items.filter(item => item.category === category).map(item => item.size).sort((a, b) => a - b)

    const firstCentile = i[Math.floor(i.length * 0.25)]
    const secondCentile = i[Math.floor(i.length * 0.5)]
    const trindCentile = i[Math.floor(i.length * 0.75)]

    if (firstCentile >= size) return 10
    if (firstCentile <= size && secondCentile > size) return DEFAULT_RADIUS
    return 26
}

const calculateSizeOfInnerIconAndroid = (items, category) => {
    const totalRating = getAverge(items, category, 'totalCountRating')
    const i = items.filter(item => item.category === category).map(item => item.totalCountRating).sort((a, b) => a - b)

    const firstCentile = i[Math.floor(i.length * 0.25)]
    const secondCentile = i[Math.floor(i.length * 0.5)]
    const trindCentile = i[Math.floor(i.length * 0.75)]

    if (firstCentile > totalRating) return 15
    if (firstCentile <= totalRating && secondCentile > totalRating) return 20
    return 25
}

export const getIphoneMainPageItems = (items) => {
    const newItems = getItems(items, 'iOS')
    const categories = getCategories(newItems)
    const out = []

    categories.forEach(category => {
        const supportedDivicesAvg = getSupportedDevicesPercentage(newItems, category, 45)
        const avergeCostOfApp = getAvergeCostOfApp(newItems, category)
        const avergeUserRating = getAverge(newItems, category, 'userRating')
        const size = calculateSizeOfOverallIconIOS(newItems, category)
        const iconSize = calculateSizeOfInnerIconIOS(newItems, category)

        out.push({
            category,
            number: supportedDivicesAvg,
            imgSrc: parseCategoryName(category),
            color: getColorByPrice(newItems, category, avergeCostOfApp),
            rating: avergeUserRating,
            width: size,
            height: size,
            iconWidth: iconSize,
            iconHeight: iconSize,
        })
    })

    out.sort((a, b) => a.rating - b.rating)

    return out
}

export const getAndroidMainPageItems = (items) => {
    const newItems = getItems(items, 'Android')
    const categories = getCategories(newItems)
    const out = []

    categories.forEach(category => {
        const avergeCostOfApp = getAvergeCostOfApp(newItems, category)
        const avergeUserRating = getAverge(newItems, category, 'userRating')
        const supportedDivicesAvg = getSupportedDevicesPercentageAndroid(newItems, category, supportDivicesAndroid)
        const radius = calculateSizeOfOverallIconAndroid(newItems, category)
        const iconSize = calculateSizeOfInnerIconAndroid(newItems, category)
        out.push({
            category,
            number: supportedDivicesAvg,
            imgSrc: parseCategoryName(category),
            color: getColorByPrice(newItems, category, avergeCostOfApp),
            rating: avergeUserRating,
            radius,
            iconWidth: iconSize,
            iconHeight: iconSize,
        })
    })
    out.sort((a, b) => a.rating - b.rating)
    return out
}

//data from https://developer.android.com/about/dashboards/index.html 17.12.19
const supportDivicesAndroid = {
    '2.3': 0.3,
    '4.0': 0.3,
    '4.1': 1.2,
    '4.2': 1.5,
    '4.3': 0.5,
    '4.4': 6.9,
    '5.0': 3.0,
    '5.1': 11.5,
    '6.0': 16.9,
    '7.0': 11.4,
    '7.1': 7.8,
    '8.0': 12.9,
    '8.1': 15.4,
    '9.0': 10.4,
}



/*
  // const items = [
    //  {category: 'earth',
    //     number:'33',
    //     imgSrc: 'earth.svg',
    //     width: '55',
    //     height: '55',
    //     color: COLORS.ORANGE_2},

    //     {category: 'utils',
    //     number:'24',
    //     imgSrc: 'edit.svg'},

    //     {category: 'utils',
    //     number:'22',
    //     imgSrc: 'feature.svg'},

    //     {category: 'dev',
    //     number:'1',
    //     imgSrc: 'settings.svg',
    //     width: '45',
    //     height: '45'
    // },
    //     {category: 'features',
    //     number:'14',
    //     imgSrc: 'console.svg',
    //     width: '40',
    //     height: '40',
    //     color: COLORS.RED},
    //     {category: 'utils',
    //     number:'22',
    //     imgSrc: 'earth.svg',
    //     color: COLORS.ORANGE},
    // ]
*/