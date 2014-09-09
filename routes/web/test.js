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
var router = express.Router();

router.get('/', function (req, res)
{
    var type = req.query.type;
    if (type == 'getaccesstoken')
    {
        res.render('getaccesstoken', {});
    }
    else if (type == 'destroyaccesstoken')
    {
        res.render('destroyaccesstoken', {});
    }
    else if (type == 'postattendance')
    {
        res.render('postattendance', {});
    }
    else
    {
        res.redirect('/');
    }
});

module.exports = router;
