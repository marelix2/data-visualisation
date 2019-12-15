const fs = require('fs')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
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

const args = process.argv.slice(2)
const path = args[0] || '../dist/data/appleStore.csv'
const fetchedPath = path

fs.createReadStream(fetchedPath)
  .pipe(csv())
  .on('data', (row) => {
    try {
      delete row['']

      const clearedRow = {}
      clearedRow.environment = 'iOS'
      clearedRow.appName = row['track_name']
      clearedRow.price = row.price
      clearedRow.totalCountRating = row['rating_count_tot']
      clearedRow.userRating = row['user_rating']
      clearedRow.category =parseCategory(row['prime_genre'])
      clearedRow.environment = 'iOS'
      clearedRow.numberOfSupportedDevices = row['sup_devices_num'] || '36'
      clearedRow.size = row['size_bytes']

     correctRows.push(clearedRow)
    }
    catch (err) {
      console.error(err)
    }
  })
  .on('end', () => {
    writeToJSON(correctRows)
    //writeToCSV(correctRows)
  })

const writeToJSON = rows => {
  fs.writeFile('outIOS.json', JSON.stringify(rows, null, 1), err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
}

const parseCategory = category => category === '9+' ||
  category === '12+' ||
   category === 'Reference' || 
   category === 'Finance' ? 'Utilities' : category

const writeToCSV = rows => {
  csvWriter
    .writeRecords(rows)
    .then(() => console.log('The CSV file was written successfully'));
}


/*
Set {
  -'Book',
  -'Business',
  'Catalogs'
  -'Education',
  -'Entertainment',
  -'Finance',
  -'Food & Drink',
  -'Games',
  -'Health & Fitness',
  -'Lifestyle',
  -'Medical',
  'Music',
  -'Navigation',
  -'News',
  -'Productivity',
  -'Photo & Video',
  'Reference',
  -'Shopping',
  -'Social Networking',
  -'Sports',
  -'Travel',
  -'Utilities',
  -'Weather',
 }

*/