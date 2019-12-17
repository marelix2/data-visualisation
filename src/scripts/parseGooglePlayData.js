const fs = require('fs')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'environment', title: 'environment' },
    { id: 'appName', title: 'track_name' },
    { id: 'size', title: 'size_bytes' },
    { id: 'price', title: 'price' },
    { id: 'totalCountRating', title: 'rating_count_tot' },
    { id: 'userRating', title: 'user_rating' },
    { id: 'category', title: 'prime_genre' },
    { id: 'numberOfSupportedDevices', title: 'sup_devices_num' },
  ]
});

const correctRows = []
const categories = []

const args = process.argv.slice(2)
const path = args[0] || '../dist/data/googlePlayStore.csv'
const fetchedPath = path

fs.createReadStream(fetchedPath)
  .pipe(csv())
  .on('data', (row) => {
    try {
      //console.log(row)
      // delete row['']

      const clearedRow = {}
      clearedRow.environment = 'Android'
      clearedRow.appName = row.App
      clearedRow.price = row.Price
      clearedRow.totalCountRating = row.Reviews
      clearedRow.userRating =  parseRating(row.Rating)
      clearedRow.category = parseCategory(row['Category'])
      clearedRow.numberOfSupportedDevices = parseVerison(row['Android Ver'])
      clearedRow.size = convertToBytes(row['Size'])

      categories.push(row['Category'])
      correctRows.push(clearedRow)
    }
    catch (err) {
      console.error(err)
    }
  })
  .on('end', () => {
    writeToJSON(correctRows)
  })

const writeToJSON = rows => {
  fs.writeFile('outAndroid.json', JSON.stringify(rows, null, 1), err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

/*
//Set {
  -'ART_AND_DESIGN',
  -'AUTO_AND_VEHICLES',
  -'BEAUTY',
  -'BOOKS_AND_REFERENCE',
  -'BUSINESS',
  -'COMICS', 
  -'COMMUNICATION',
  -'DATING',
  -'EDUCATION',
  -'ENTERTAINMENT',
  - EVENTS',
  -'FINANCE',
  -'FOOD_AND_DRINK',
  -'HEALTH_AND_FITNESS',
  -'HOUSE_AND_HOME',
  -'LIBRARIES_AND_DEMO',
  -'LIFESTYLE',
  -'GAME',
  -'FAMILY',
  -'MEDICAL',
  -'SOCIAL',
  -'SHOPPING',
  -'PHOTOGRAPHY',
  -'SPORTS',
  -'TRAVEL_AND_LOCAL',
  -'TOOLS',
  -'PERSONALIZATION',
  -'PRODUCTIVITY',
  -'PARENTING',
  -'WEATHER',
  -'VIDEO_PLAYERS',
  -'NEWS_AND_MAGAZINES',
  -'MAPS_AND_NAVIGATION',
  '1.9' }
*/
const parseCategory = option => {
  switch (option) {
    case 'BOOKS_AND_REFERENCE':
    case 'COMICS':
    case 'LIBRARIES_AND_DEMO':
      return 'Book'

    case 'EDUCATION':
      return 'Education'

    case 'GAME':
      return 'Games'

    case 'TRAVEL_AND_LOCAL':
    case 'AUTO_AND_VEHICLES':
      return 'Travel'

    case 'WEATHER':
      return 'Weather'

    case 'PRODUCTIVITY':
    case 'TOOLS':
    case 'PERSONALIZATION':
    case 'ART_AND_DESIGN':
    case 'HOUSE_AND_HOME':
      return 'Utilities'

    case 'BEAUTY':
    case 'DATING':
    case 'LIFESTYLE':
    case 'FAMILY':
    case 'PARENTING':
      return 'Lifestyle'

    case 'BUSINESS':
      return 'Business'

    case 'FINANCE':
      return 'Finance'

    case 'FOOD_AND_DRINK':
      return 'Food & Drink'

    case 'PRODUCTIVITY':
      return 'Productivity'

    case 'MAPS_AND_NAVIGATION':
      return 'Navigation'

    case 'ENTERTAINMENT':
      return 'Entertainment'

    case 'HEALTH_AND_FITNESS':
      return 'Health & Fitness'

    case 'PHOTOGRAPHY':
    case 'VIDEO_PLAYERS':
      return 'Photo & Video'

    case 'SPORTS':
      return 'Sports'

    case 'COMMUNICATION':
    case 'SOCIAL':
      return 'Social Networking'

    case 'SHOPPING':
      return 'Shopping'

    case 'NEWS_AND_MAGAZINES':
    case 'EVENTS':
      return 'News'

    case 'MEDICAL':
      return 'Medical'

  }
}

const parseVerison = version => {
  if(version) {
    if(version.includes('Varies with device')) return '4.0'
    if(version.includes('1.')|| version.includes('2.') || version.includes('3.') ) return '2.3'
    if(version.includes('4.0')) return '4.0'
    if(version.includes('4.1')) return '4.1'
    if(version.includes('4.2')) return '4.2'
    if(version.includes('4.3')) return '4.3'
    if(version.includes('4.4')) return '4.4'
    if(version.includes('5.0')) return '5.0'
    if(version.includes('5.1')) return '5.1'
    if(version.includes('6.0')) return '6.0'
    if(version.includes('7.0')) return '7.0'
    if(version.includes('7.1')) return '7.1'
    if(version.includes('8.0')) return '8.0'
    if(version.includes('8.1')) return '8.1'
    if(version.includes('9.0')) return '9.0'
  }
  else {
    return '4.0'
  }

}

const parseRating = rating => { 
  return rating === 'NaN' ? `${Math.floor(Math.random(3) + 1)}.${Math.floor(Math.random(8)+ 1)}` : rating
}

const convertToBytes = value => {
  let converted 
  if( value.includes('M')) {
    converted =  parseFloat(value.split('M')[0]) * 1000000 + Math.floor(Math.random() * 100000)
  }else if(value.includes('k')) {
    converted = parseFloat(value.split('k')[0]) * 1000 + Math.floor(Math.random() * 100)
  }else {
    converted = 0
  }

  return `${converted}`
}
