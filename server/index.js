const express = require('express');
const axios = require('axios');
var cors = require('cors');

const PORT = 1234;
const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
	
	//requestString can be paramaterized
	
	//https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=false
	
	
	let reqString = 
		"https://api.imgur.com/3/gallery/"+
		req.body.section+"/"+
		req.body.sort+"/"+
		req.body.window+"/"+
		req.body.page;
	
		axios.get(reqString, { headers: {"Authorization" : 'Client-ID fb5c7dd2a2711f0'} })
			.then(response => {
				
				let resData = response.data;
				
				let imgData = [];
				
				for(let iData of resData['data']) {
					
					if(imgData.length < 100 && iData['images'] != null && iData['images'].length > 0) {
						imgData.push( iData['images'][0].link );
					}
				}
				
				res.json({ imageData: imgData });
				
				return res.status(200);
			})
			.catch(error => {
				console.log(error);
		});
			
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});