/*'use strict';
module.exports = function(app) {
  var content = require('../controllers/contentController');

  // todoList Routes
  app
    .route('/content')
    .get(content.list_all_content)
    .post(content.create_content);

  app
    .route('/content/:contentId')
    .get(content.read_content)
    .put(content.update_content)
    .delete(content.delete_content);
};*/

module.exports = (function() {
  'use strict';
  var routes = require('express').Router();
  var content = require('../controllers/contentController');

  routes.get('/feed', content.get_feed);
  routes
    .get('/content', content.get_content)
    .post('/content', content.create_content);

  return routes;
})();
