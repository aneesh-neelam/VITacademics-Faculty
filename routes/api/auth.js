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

var api_auth = require(path.join(__dirname, '..', '..', 'api', 'auth'));


router.post('/gettoken', function (req, res)
{
    var empId = req.body.empid;
    var password = req.body.password;
    var validity = 600000;
    var onSubmit = function (err, response)
    {
        if (err)
        {
            res.send(response);
        }
        else
        {
            res.cookie('empid', empId, {maxAge: validity, signed: true});
            res.send(response);
        }
    };
    api_auth.gettoken(empId, password, validity, onSubmit);
});

router.post('/destroytoken', function (req, res)
{
    var token = req.body.token;
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
    res.clearCookie('empid', { });
    api_auth.destroytoken(token, onSubmit);
});

module.exports = router;
