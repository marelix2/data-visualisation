import items from './../scripts/out.json'
import { 
    getCategories,
    getAndroidMainPageItems,
    getIphoneMainPageItems,
} from './../utils/utils'

const state = {
    items,
    categories: getCategories(items),
    iphoneDisplayerItems: getIphoneMainPageItems(items),
    androidDisplayerItems: getAndroidMainPageItems(items),
}


export default state