'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "PostTitle" on table "posts"
 *
 **/

var info = {
    "revision": 6,
    "name": "make_posts_table",
    "created": "2019-06-21T20:26:06.149Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "posts",
        "PostTitle",
        {
            "type": Sequelize.STRING,
            "field": "PostTitle",
            "unique": false,
            "allowNull": false
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
