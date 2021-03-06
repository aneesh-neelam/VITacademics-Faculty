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
var path = require('path');

var db = require(path.join(__dirname, 'db'));

exports.register = function (empId, password, callback)
{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    var newUser = {
        _id: empId,
        PasswordHash: hash
    };
    var onInsert = function (err, docs)
    {
        var data;
        if (err)
        {
            data = 'Faculty ID already exists';
            callback(err, data)
        }
        else
        {
            data = empId + ' Registered';
            callback(err, data)
        }
    };
    db.insert(newUser, onInsert);
};
