const express = require('express');
const router = express.Router();
const Trades = require('../models/trades');

/* trade object example
{
    "id":1,
    "type": "buy",
    "user_id": 23,
    "symbol": "ABX",
    "shares": 30,
    "price": 134,
    "timestamp": 1531522701000
}
*/

/* GET trades page.
- returns a collection of all trades (OK!)
- the response code is 200, and the response body is an array of all trades objects ordered by their ids in increasing order (CHECK)
- optionally accepts query parameters type and user_id, for example `/trades?type=buy&&user_id=122`. All these parameters are optional. In case they are present, only objects matching the parameters must be returned. (NO)
/trades?type=buy&&user_id=122
/trades?type=buy&user_id=2
 */
router.get('/', async (req, res, next) => {
  console.log('req.query ' + req.query);
  try {
    let type = req.query.type;
    let user_id = req.query.user_id;

    const respuesta = await Trades.findAll();
    res.status(200).send(respuesta);
  } catch (e) {
    console.error(e.message);
    res.status(413).send(e.message);
  }
});

/* GET/id trades page.
- returns a trade with the given id (OK!)
- if the matching trade exists, the response code is 200 and the response body is the matching trade object (OK!)
- if there is no trade with the given id in the collection, the response code is 404 with the body having the text `ID not found` (OK!)
*/
router.get('/:id', async (req, res, next) => {
  try {
    const respuesta = await Trades.findOne({ where: { id: req.params.id } });
    console.log(respuesta);
    if (respuesta === null) {
      throw new Error('ID not found');
    }

    res.status(200).send(respuesta);
  } catch (e) {
    console.error(e.message);
    res.status(404).send(e.message);
  }
});

/* POST trades page.
creates a new trade
- expects a JSON trade object without an id property as a body payload.
  - If the shares value is out of accepted range [1, 100] (OK)
  - the type value is invalid (i.e. not 'buy' or 'sell') (OK)
  the API must return error code 400. Besides those cases, you can assume that the given payload is always valid.(OK)
- adds the given trade object to the collection of trades and assigns a unique integer id to it. The first created trade must have id 1, the second one 2, and so on. (CHECK)
- the response code is 201, and the response body is the created trade object (CHECK)
*/
router.post('/', async (req, res, next) => {
  try {
    // checks if the shares value is out of accepted range [1, 100]
    if (req.body.shares < 1 || req.body.shares > 100) {
      throw new Error('Range must be between 1 and 100');
    }
    // checks if the type value is invalid (i.e. not 'buy' or 'sell')
    if (req.body.type !== 'buy' && req.body.type !== 'sell') {
      throw new Error('Type is not correct');
    }

    // ingresa trades a la BD
    let trades = {
      type: req.body.type,
      user_id: req.body.user_id,
      symbol: req.body.symbol,
      shares: req.body.shares,
      price: req.body.price,
      timestamp: req.body.timestamp,
    };
    let respuesta = await Trades.create(trades);
    res.status(201).send(respuesta);
  } catch (e) {
    console.error(e.message);
    res.status(400).send(e.message);
  }
});

// /* DELETE/id trades page.
// - the response code is 405 because the API does not allow deleting or modifying trades for any id value (OK)
// */
router.delete('/:id', async (req, res, next) => {
  try {
    throw new Error(
      'The API does not allow deleting or modifying trades for any id value'
    );
  } catch (e) {
    console.error(e.message);
    res.status(405).send(e.message);
  }
});

// /* PUT/id trades page.
// - the response code is 405 because the API does not allow deleting or modifying trades for any id value (OK)
// */
router.put('/:id', async (req, res, next) => {
  try {
    throw new Error(
      'The API does not allow deleting or modifying trades for any id value'
    );
  } catch (e) {
    console.error(e.message);
    res.status(405).send(e.message);
  }
});

// /* PATCH/id trades page.
// - the response code is 405 because the API does not allow deleting or modifying trades for any id value (OK)
// */
router.patch('/:id', async (req, res, next) => {
  try {
    throw new Error(
      'The API does not allow deleting or modifying trades for any id value'
    );
  } catch (e) {
    console.error(e.message);
    res.status(405).send(e.message);
  }
});

module.exports = router;
