export const getCategories = (items) =>  [...new Set(items.map(item  => item.category))].filter(_ => _)

export const getItems = (items, env) => items.filter( item => item.environment === env)

const getSupportedDevices = (items, category) => {
    const supportedDevices = items.filter( item => item.category === category)
    return  Math.floor(supportedDevices.reduce((acc, {numberOfSupportedDevices}) => acc + parseInt(numberOfSupportedDevices), 0) / supportedDevices.length)
}

const parseCategoryName = category => `${category.split(' ').join('')}.svg`

export const getIphoneMainPageItems = (items) => {
    const newItems = getItems(items, 'iOS')
    const categories = getCategories(newItems)
    const out = []
    categories.forEach( category => {
        const supportedDivicesAvg = getSupportedDevices(newItems, category)
        out.push({
            category,
            number: supportedDivicesAvg,
            imgSrc: parseCategoryName(category),
        })
    })

    return out   
}

export const getAndroidMainPageItems = (items) => {
    const newItems = getItems(items, 'Android')
    const categories = getCategories(newItems)
    const out = []
    categories.forEach( category => {
        // const supportedDivicesAvg = getSupportedDevices(newItems, category)
        out.push({
            category,
            number: 99,
            imgSrc: parseCategoryName(category),
        })
    })

    return out   
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