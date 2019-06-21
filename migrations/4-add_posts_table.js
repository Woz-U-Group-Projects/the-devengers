'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "add_posts_table",
    "created": "2019-06-21T19:47:23.874Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "posts",
        {
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "allowNull": false,
                "autoIncrement": true
            },
            "PostTitle": {
                "type": Sequelize.STRING,
                "field": "PostTitle",
                "allowNull": false
            },
            "Description": {
                "type": Sequelize.STRING,
                "field": "Description",
                "allowNull": true
            },
            "Username": {
                "type": Sequelize.STRING,
                "field": "Username",
                "allowNull": false,
                "unique": true
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
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
