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

var api_admin = require(path.join(__dirname, '..', '..', 'api', 'administration', 'admin'));


router.get('/register', function (err, res)
{
    res.render('register', {});
});

router.post('/register', function (req, res)
{
    var empId = req.body.empid;
    var password = req.body.password;
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
    api_admin.register(empId, password, onSubmit);
});

module.exports = router;
