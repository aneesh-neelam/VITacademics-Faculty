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

var express = require('express');
var path = require('path');
var router = express.Router();

var api_classes = require(path.join(__dirname, '..', '..', 'api', 'classes', 'classes'));


router.post('/postattendance', function (req, res)
{
    var token = req.body.token;
    var attendance = JSON.parse(req.body.attendance);
    attendance.Date = new Date(req.body.date);
    var onSubmit = function (err, response)
    {
        if (err)
        {
            res.send(response);
        }
        else
        {
            res.send(response);
        }
    };
    api_classes.postAttendance(token, attendance, onSubmit);
});

module.exports = router;
