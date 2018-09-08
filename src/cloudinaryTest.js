var cloudinary = require('cloudinary')
var axios = require('axios')
var cheerio = require('cheerio')

const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg(('

cloudinary.config({
  cloud_name: 'dyndy7ttf',
  api_key: '895836861633589',
  api_secret: 'PvQWb4PBSXJaEPmg6RR-hpTFgbo'
})

// cloudinary.v2.uploader.add_tag('css_center', ['css_center_1', 'css_center_2'],
//   function(err, res){
//     console.log(res, err);
//   })

// cloudinary.v2.uploader.multi('css_center',
//       function(error,result) {console.log(result) });

axios.get('https://api.stackexchange.com//2.2/search?order=desc&sort=activity&intitle=css%20center&site=stackoverflow&key='+STACK_API_KEY).then(function(res){
  console.log(res.data);
});
})
axios.get('https://stackoverflow.com/questions/46954736/html-css-center-buttons').then(function(res){
  const $ = cheerio.load(res.data);
  console.log($('code').text());
})
