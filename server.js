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
    dateTimeFrom: '10/16/2019 10:00pm',
    dateTimeTo: '10/17/2019 10:00am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 2,
    dateTimeFrom: '10/17/2019 11:00pm',
    dateTimeTo: '10/18/2019 7:00am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 3,
    dateTimeFrom: '10/18/2019 10:00pm',
    dateTimeTo: '10/19/2019 6:00am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 4,
    dateTimeFrom: '10/19/2019 9:00pm',
    dateTimeTo: '10/20/2019 7:00am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 5,
    dateTimeFrom: '10/20/2019 11:00pm',
    dateTimeTo: '10/21/2019 6:00am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 6,
    dateTimeFrom: '10/21/2019 9:00pm',
    dateTimeTo: '10/22/2019 5:00am',
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

app.get('/api/data/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/data', authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put('/api/data/:id', authenticator, (req, res) => {
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

app.delete('/api/data/:id', authenticator, (req, res) => {
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