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

var path = require('path');

var db = require(path.join(__dirname, 'db'));
var error = require(path.join(__dirname, '..', 'error'));


exports.postAttendance = function (classNumber, token, attendance, callback)
{
    var credentials = {
        _id: classNumber,
        Token: token
    };
    var data = {};
    var onUpdate = function (err, count, status)
    {
        if (err)
        {
            data.Error = error.codes.MongoDown;
            callback(err, data);
        }
        else if (count == 0)
        {
            data.Error = error.codes.NoData;
            callback(true, data);
        }
        else
        {
            data.Error = error.codes.Success;
            callback(false, data);
        }
    };
    db.updateDocument(credentials, {$push: {Attendance: attendance}}, onUpdate);
};
