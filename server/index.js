const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
// const {TOKEN, SERVER} = require('../config.js')
const TOKEN = process.env.TOKEN;
const SERVER = process.env.SERVER;
// var proxy = require('express-http-proxy');
const axios = require('axios');

const app = express()
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// app.use('/', proxy(`https://app-hrsei-api.herokuapp.com`, {
//   proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
//     proxyReqOpts.headers = {...proxyReqOpts.headers, "Authorization": TOKEN};
//     return proxyReqOpts;
//   }
// }));

var headers = {
  headers: {
    Authorization : TOKEN
  }
}

app.get('/products', (req, res) => {
  axios.get(`${SERVER}/products`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.get('/products/:product_id', (req, res) => {
  axios.get(`${SERVER}/products/${req.params.product_id}`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.get('/products/:product_id/styles', (req, res) => {
  axios.get(`${SERVER}/products/${req.params.product_id}/styles`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.get('/products/:product_id/related', (req, res) => {
  axios.get(`${SERVER}/products/${req.params.product_id}/related`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.get('/qa/questions', (req, res) => {
  var query = '?';
  for (var i = 0; i < Object.keys(req.query).length; i++) {
    query = query + Object.keys(req.query)[i] + '=' + req.query[Object.keys(req.query)[i]] + '&'
  }
  axios.get(`${SERVER}/qa/questions${query}`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.get('/qa/questions/:questions_id/answers', (req, res) => {
  var query = '?';
  for (var i = 0; i < Object.keys(req.query).length; i++) {
    query = query + Object.keys(req.query)[i] + '=' + req.query[Object.keys(req.query)[i]] + '&'
  }
  axios.get(`${SERVER}/qa/questions/${req.params.questions_id}/answers${query}`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.post('/qa/questions', (req, res) => {
  axios.post(`${SERVER}/qa/questions`, req.body, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`${SERVER}/qa/questions/${req.params.question_id}/answers`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  axios.post(`${SERVER}/qa/questions/${req.params.question_id}/answers`, req.body, headers)
  .then(data => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`${SERVER}/qa/questions/${req.params.question_id}/helpful`, {}, headers)
  .then(data => {
    res.sendStatus(204);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.put('/qa/questions/:question_id/report', (req, res) => {
  axios.put(`${SERVER}/qa/questions/${req.params.question_id}/helpful`, {}, headers)
  .then(data => {
    res.sendStatus(204);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  axios.put(`${SERVER}/qa/answers/${req.params.answer_id}/helpful`, {}, headers)
  .then(data => {
    res.sendStatus(204);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`${SERVER}/qa/answers/${req.params.answer_id}/report`, {}, headers)
  .then(data => {
    res.sendStatus(204);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.get('/cart', (req, res) => {
  axios.get(`${SERVER}/cart`, headers)
  .then(data => {
    res.json(data.data);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})


app.post('/cart', (req, res) => {
  axios.post(`${SERVER}/cart`, req.body, headers)
  .then(data => {
    res.sendStatus(201);
  })
  .catch(err => {
    res.sendStatus(400);
  })
})

app.get('/reviews', (req, res) => {
  axios.get(`${SERVER}${req.url}`, headers)
  .then((data) => {
    console.log(data.data);
    res.json(data.data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

app.get('/reviews/meta', (req, res) => {
  axios.get(`${SERVER}${req.url}`, headers)
  .then((data) => {
    console.log(data.data);
    res.json(data.data);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

app.post('/reviews', (req, res) => {
  axios.post(`${SERVER}${req.url}`, req.body, headers)
  .then((data) => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

app.put('/reviews/:id/report', (req, res) => {
  axios.put(`${SERVER}${req.url}`, {}, headers)
  .then((data) => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});

app.put('/reviews/:id/helpful', (req, res) => {
  axios.put(`${SERVER}${req.url}`, {}, headers)
  .then((data) => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(400);
  })
});


// app.get('/reviews', (req, res) => {
//   axios.get('http://3.140.190.48' + req.url)
//   .then((data) => {
//     console.log(data.data);
//     res.json(data.data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.sendStatus(400);
//   })
// });


// app.get('/reviews/meta', (req, res) => {
//   axios.get('http://3.140.190.48' + req.url)
//   .then((data) => {
//     console.log(data.data);
//     res.json(data.data);
//   })
//   .catch(err => {
//     console.log(err);
//     res.sendStatus(400);
//   })
// });

// app.post('/reviews', (req, res) => {
//   axios.post('http://3.140.190.48' + req.url, req.body)
//   .then((data) => {
//     res.sendStatus(200);
//   })
//   .catch(err => {
//     console.log(err);
//     res.sendStatus(400);
//   })
// });

// app.put('/reviews/:id/report', (req, res) => {
//   axios.put('http://3.140.190.48' + req.url)
//   .then((data) => {
//     res.sendStatus(200);
//   })
//   .catch(err => {
//     console.log(err);
//     res.sendStatus(400);
//   })
// });

// app.put('/reviews/:id/helpful', (req, res) => {
//   axios.put('http://3.140.190.48' + req.url)
//   .then((data) => {
//     res.sendStatus(200);
//   })
//   .catch(err => {
//     console.log(err);
//     res.sendStatus(400);
//   })
// });


app.listen(port, (err,something) => {
  console.log('Server running on port ' + port);
})

