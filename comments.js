// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Parse JSON
app.use(bodyParser.json());

// Read comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments file');
      return;
    }

    res.send(data);
  });
});

// Create comment
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading comments file');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(req.body);

    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing comments file');
        return;
      }

      res.send('Comment created');
    });
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Path: comments.json
// []