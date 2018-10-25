'use strict';

var mongoose = require('mongoose'),
  Content = mongoose.model('Content');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['10.0.0.137'],
  keyspace: 'production'
});

exports.list_all_content = function(req, res) {
  const query =
    'SELECT content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, owner_name, owner_type, owner_username, total_spots, visibility FROM content';
  client.execute(query, function(err, result) {
    if (err != null) console.log(err);
    var content = result;
    res.json(content);
  });
};

exports.get_feed = function(req, res) {
  const query =
    'SELECT content_id, created_date, activity_type, city, content, content_type, cost, image_url, name, owner_id, owner_name, owner_type, owner_username, total_spots, visibility FROM feeds WHERE owner_id = ' +
    req.query.id;
  client.execute(query, function(err, result) {
    if (err != null) console.log(err);
    var content = result;
    res.json(content);
  });
};

exports.create_content = function(req, res) {
  var new_content = new Content(req.body);
  new_task.save(function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.read_content = function(req, res) {
  Content.findById(req.params.taskId, function(err, task) {
    if (err) res.send(err);
    res.json(task);
  });
};

exports.update_content = function(req, res) {
  Content.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true },
    function(err, task) {
      if (err) res.send(err);
      res.json(task);
    }
  );
};

exports.delete_content = function(req, res) {
  Content.remove(
    {
      _id: req.params.taskId
    },
    function(err, task) {
      if (err) res.send(err);
      res.json({ message: 'Task successfully deleted' });
    }
  );
};
