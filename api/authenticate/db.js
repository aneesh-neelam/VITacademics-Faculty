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

var MongoClient = require('mongodb').MongoClient;

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/VITacademics';


exports.fetchDocument = function (credentials, fields, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err, null);
        }
        else
        {
            var collection = db.collection('faculty');
            var onFetch = function (err, document)
            {
                db.close();
                if (err)
                {
                    callback(err, null);
                }
                else if (document)
                {
                    callback(false, document);
                }
                else
                {
                    callback(false, null);
                }
            };
            collection.findOne(credentials, fields, onFetch);
        }
    };
    MongoClient.connect(mongoUri, onConnect);
};

exports.updateDocument = function (credentials, updatedDoc, options, callback)
{
    var onConnect = function (err, db)
    {
        if (err)
        {
            callback(err, null);
        }
        else
        {
            var collection = db.collection('classes');
            var onUpdate = function (err, document)
            {
                db.close();
                if (err)
                {
                    callback(err, null);
                }
                else if (document)
                {
                    callback(false, document);
                }
                else
                {
                    callback(false, null);
                }
            };
            collection.update(credentials, updatedDoc, options, onUpdate);
        }
    };
    MongoClient.connect(mongoUri, onConnect);
};
