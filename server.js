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
    dateTimeFrom: '2019-10-16 10:00 pm',
    dateTimeTo: '2019-10-17 10:00 am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 2,
    dateTimeFrom: '2019-10-17 11:00 pm',
    dateTimeTo: '2019-10-18 7:00 am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 3,
    dateTimeFrom: '2019-10-18 10:00 pm',
    dateTimeTo: '2019-10-19 6:00 am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 4,
    dateTimeFrom: '2019-10-19 9:00 pm',
    dateTimeTo: '2019-10-20 7:00 am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 5,
    dateTimeFrom: '2019-10-20 11:00 pm',
    dateTimeTo: '2019-10-21 6:00 am',
    feels: '😃',
    notes: 'Slept Great'
  },
  {
    id: 6,
    dateTimeFrom: '2019-10-21 9:00 pm',
    dateTimeTo: '2019-10-22 5:00 am',
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