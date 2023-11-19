const app = require('express')();
const PORT = 8080;
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

let postData = [
    { id: '2cc192ec-b863-4453-9c96-6aac716d58fa', name: 'Antonia', email: 'antonia@gmail.com', "age": "15", salary: '10k', description: 'This is Antonia profile' },
    { id: '3cc192ec-b863-4453-9c96-6aac716d58fa', name: 'Beatriz', email: 'beatriz@gmail.com', "age": "25", salary: '20k', description: 'This is Beatriz profile' } ,
    { id: '4cc192ec-b863-4453-9c96-6aac716d58fa', name: 'Brayden', email: 'brayden@gmail.com', "age": "35", salary: '30k', description: 'This is Brayden profile' },
    { id: '5cc192ec-b863-4453-9c96-6aac716d58fa', name: 'Hugo', email: 'hugo@gmail.com', "age": "45", salary: '40k', description: 'This is Hugo profile' } 
  ];

app.get('/get', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(postData);
});

app.get('/get/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const item = postData.find((item) => item.id === itemId);
  
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });



app.post('/post', (req, res) => {

    // console.log('received Data:::::::', req.body);
    const newData = req.body;
    newData.id = uuidv4();
    postData.push(newData);

    res.send('Data posted successfully!');
});
app.listen(PORT, 
    ()=>console.log("server is runnning"))