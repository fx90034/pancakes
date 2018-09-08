var axios = require('axios')
var cheerio = require('cheerio')

const STACK_API_KEY = 'Wf4WyQYvjRRtsqcIFLEPpg(('


// cloudinary.v2.uploader.add_tag('css_center', ['css_center_1', 'css_center_2'],
//   function(err, res){
//     console.log(res, err);
//   })

// cloudinary.v2.uploader.multi('css_center',
//       function(error,result) {console.log(result) });
url = 'https://api.stackexchange.com//2.2/search?order=desc&sort=activity&intitle=css%20center&site=stackoverflow&key='+STACK_API_KEY
console.log(url)
axios.get(url).then(function(res){
  res.data.items.forEach(function(el){
    delete el.owner;
    delete el.is_answered;
    delete el.view_count;
    delete el.closed_date;
    delete el.accepted_answer_id;
    delete el.score;
    delete el.last_activity_date;
    delete el.creation_date;
    delete el.question_id;
    delete el.closed_reason;
    delete el.last_edit_date;


  });
  console.log(res.data.items)
});

// axios.get('https://stackoverflow.com/questions/46954736/html-css-center-buttons').then(function(res){
//   const $ = cheerio.load(res.data);
//   console.log($('code').text());
// })
