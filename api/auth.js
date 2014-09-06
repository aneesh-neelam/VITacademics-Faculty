/*
 *  VITacademics - Faculty
 *  Copyright (C) 2014  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var bcrypt = require('bcrypt');
var cache = require('memory-cache');
var path = require('path');
var underscore = require('underscore');

var db = require(path.join(__dirname, 'db'));
var error = require(path.join(__dirname, 'error'));
var resource = require(path.join(__dirname, 'token-resource'));


exports.gettoken = function (empId, password, validity, callback)
{
    var credentials = {
        _id: empId
    };
    var onFetch = function (err, document)
    {
        var data = {};
        if (err)
        {
            data.Error = error.codes.MongoDown;
            callback(err, data);
        }
        else if (document)
        {
            if (bcrypt.compareSync(password, document.password_hash))
            {
                data.Error = error.codes.Success;
                callback(err, data);
                var token;
                do
                {
                    token = underscore.sample(resource.resources, 6).join('');
                }
                while (cache.get(token));
                data.Token = {
                    Token: token,
                    Validity: validity,
                    Issued: new Date().toUTCString()
                };
                cache.put(empId, token, validity * 60 * 60 * 1000);
                callback(false, data);
            }
            else
            {
                data.Error = error.codes.Invalid;
                callback(true, data);
            }
        }
        else
        {
            data.Error = error.codes.NoData;
            callback(true, data);
        }
    };
    db.fetchDocument(credentials, {_id: 1, password_hash: 1}, onFetch);
};

exports.destroytoken = function (token, callback)
{

};
