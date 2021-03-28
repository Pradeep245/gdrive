const express = require('express')
const app = express();
const port = 5000;


const multer = require('multer')
const { google } = require('googleapis')

const fs = require('fs')

app.set('view engine', 'ejs')
const dir = './upload'
const CLIENT_ID = '813472167072-l05k3c7evmo1pep22ts9ae17rs3662n9.apps.googleusercontent.com'
const CLIENT_SECRET = 'rT7BQmKrOd8N1mr1d6O9vqN8'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Ig1GZ8580rZCgYIARAAGAQSNwF-L9Iry0Ah25VJ3OhzOIy6NkuftYAfZQJc15aCnprr9hqWbChx4YCxOwDmb5tADkCjsRX1jgo'

const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,REDIRECT_URI

	);

oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
	version:'v3',
	auth:oauth2Client
})

app.get('/home', function (req, res) {

  res.render('index')
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
})
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
callback(null, './upload')
    
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

app.post('/projects', upload.array('uploadedImages', 10), function(req, res, err) {
  if (err) {
    console.log('error');
    console.log(err);
  }

  var file = req.files;
  res.end();
  //console.log(req.files.mimetype);
  datas();
});



// 




 function datas(){
	const files = fs.readdirSync(dir)
var dirs = []
for (const file of files) {
  dirs.push(`./upload/${file}`)

}
//console.log(dirs)
 async function uploadss() {
	try{
		for(link in dirs){
			let liss = `${dirs[link]}`;





				


			



			console.log(typeof liss)
			if (liss.includes('.jpeg')) {
		const response = await drive.files.create({
			requestBody: {
				name : `one${link}.jpg`,
				mimeType:'image/jpg'
			},
			media:{
				mimeType:'image/jpg',
				body: fs.createReadStream(dirs[link]),
			},
		})


		console.log(response.data)
}
else if(liss.includes('.pdf')){
	let response = await drive.files.create({
			requestBody: {
				name : `one${link}.pdf`,
				mimeType:'application/pdf'
			},
			media:{
				mimeType:'application/pdf',
				body: fs.createReadStream(dirs[link]),
}
})
	console.log(response.data.id)
	}
}
	}catch(error){
		console.log(error.message)
	}


}

uploadss();
}







app.listen(port,()=>{
	console.log(`port ${port} started`)
})
