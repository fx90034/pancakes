var axios = require('axios')
var cheerio = require('cheerio')
var algolia = require('algoliasearch')

const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg(('
const client = algolia('M5GUPZR9NF','1c60567fa57df21fd50a4fa5e491edb2')

// cloudinary.v2.uploader.add_tag('css_center', ['css_center_1', 'css_center_2'],
//   function(err, res){
//     console.log(res, err);
//   })

// cloudinary.v2.uploader.multi('css_center',
//       function(error,result) {console.log(result) });

// url = 'https://api.stackexchange.com//2.2/search?order=desc&sort=activity&intitle=css%20center&site=stackoverflow&key='+STACK_API_KEY
// console.log(url)
// axios.get(url).then(function(res){
//   res.data.items.forEach(function(el){
//     delete el.owner;
//     delete el.is_answered;
//     delete el.view_count;
//     delete el.closed_date;
//     delete el.accepted_answer_id;
//     delete el.score;
//     delete el.last_activity_date;
//     delete el.creation_date;
//     delete el.question_id;
//     delete el.closed_reason;
//     delete el.last_edit_date;
//
//
//   });
//   console.log(res.data.items)
// });
url = 'https://stackoverflow.com/questions/46954736/html-css-center'
url = url.substr(url.indexOf('questions/')+10);
url = url.substr(0, url.indexOf('/'));

async function getSnips(){
  url = 'https://stackoverflow.com/questions/46954736/html-css-center'
  url = url.substr(url.indexOf('questions/')+10);
  url = url.substr(0, url.indexOf('/'));
  snippets = await axios.get('https://stackoverflow.com/questions/46954736/html-css-center-buttons').then(function(res){
    const $ = cheerio.load(res.data);
    const snippets = []

    $('.answer').each(function(i, elem) {
    var baseurl = 'https://stackoverflow.com/questions/'
    snippets[i] ={
      id: $(this).attr('id'),
      text: $(this).find('code').text()
    }

  });

    console.log(snippets);
    return snippets;


  });
}


  var index = client.initIndex(url);
  //
//   index.addObjects(snippets, function(err, content) {
//     if (err) {
//       console.error(err);
//     }
//   });
//
//   index.setSettings({
//     'searchableAttributes': [
//       'text'
//     ]
//   }, function(err, content){
//     console.log(content);
//   });
//
//
//
  index.search('button', function(err, content) {
    console.log(content.hits);
  });

//
// //var index = client.initIndex(url);
//
// client.listIndexes(function(err, content) {
//   if (err) throw err;
//
//   console.log(content);
// });
// //
// index.search('center', function(err, content) {
//   console.log(content.hits);
// });

//getSnips();
