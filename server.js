const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 7;

let friends = [
  {
    id: 1,
    date: 'Ben',
    timeFrom: 30,
    timeTo: 'ben@lambdaschool.com',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 2,
    date: 'Austen',
    timeFrom: 45,
    timeTo: 'austen@lambdaschool.com',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 3,
    date: 'Ryan',
    timeFrom: 15,
    timeTo: 'ryan@lambdaschool.com',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 4,
    date: 'Dustin',
    timeFrom: 25,
    timeTo: 'D-munny@lambdaschool.com',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 5,
    date: 'Sean',
    timeFrom: 35,
    timeTo: 'sean@lambdaschool.com',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 6,
    date: 'Michelle',
    timeFrom: 67,
    timeTo: 'michelle@gmail.com',
    feels: '😃',
    notes: 'Slept Great'
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User be logged in to do that.' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === '12' && password === '12') {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

app.get('/api/data', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get('/api/friends/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/friends', authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.delete('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});