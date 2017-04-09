var router = require('express').Router();
const db = require('../models')
const _ = require('lodash')

/* GET home page. */
router.get('/', async function(req, res, next) {
  let columns = [];
  try {
    columns = await db.sequelize.query(`
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
      AND table_name != 'SequelizeMeta'
      ORDER BY table_name, ordinal_position;
      `);
  } catch (e) {
    conosle.log('Error querying for list of tables and columns', e);
  }

  /*
   * Put data into a strucure that makes view logic simpler
   * { tables: ['Users', 'Posts'],
   *   columns: { Users: ['first_name', 'last_name'],
   *              Posts: ['title', 'author', 'body']
   *            }
   * }
   */
  const dbStructure = {
    tables: _.uniq(_.map(columns[0], c => c.table_name)),
    columns: _.transform(columns[0], (result, c) => {
      if (!result[c.table_name]) result[c.table_name] = new Array
      result[c.table_name].push(c.column_name)
    }, {})
  }

  res.render('index', {
    title: 'Express',
    db: dbStructure
   });
});

/* GET health check. */
router.get('/health', (req, res, next) => {
  return res.json({
    healthy: true
  });
});

module.exports = router;
