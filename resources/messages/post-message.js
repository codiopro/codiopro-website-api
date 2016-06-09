(function () {
  'use strict';

  var config = require('config');
  var sendGrid = require('sendgrid')(config.apis.sendGrid.apiKey);

  module.exports = function (req, res) {
    if (!req.body) {
      return res.status(400).send();
    }

    console.log(req.body);

    var email = new sendGrid.Email({
      to: config.service.adminEmail,
      from: req.body.email,
      subject: config.service.application,
      text: JSON.stringify(req.body),
    });

    email.setFilters({
      templates: {
        settings: {
          enable: 1,
          template_id: config.apis.sendGrid.templates.contactUs,
        },
      },
    });

    sendGrid.send(
      email,
      function (sendGridErr, sendGridRes) {
        if (sendGridErr) {
          console.error(sendGridErr);
          return res.status(500).send();
        }

        return res.send(sendGridRes);
      });
  };
}());
