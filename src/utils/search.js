import Fuse from 'fuse.js'

import search_data from '../constants/locations'

const options = {
  shouldSort: true,
  threshold: 0,
  location: 0,
  distance: 0,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
    "formatted_address"
  ]
};
const fuse = new Fuse(search_data, options);

export default (textContent = '') => {
  return fuse.search(textContent)
}