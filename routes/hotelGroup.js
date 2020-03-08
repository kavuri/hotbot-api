/* Copyright (C) Kamamishu Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

'use strict';
const express = require('express');
const router = express.Router();
const auth0 = require('../lib/auth0');
const HotelGroupModel = require('../db/HotelGroup'),
    _ = require('lodash'),
    { check, validationResult } = require('express-validator');

/**
 * @returns all hotel groups
 */
router.get('/',
    // auth0.authenticate,
    // auth0.authorize('read:hotel'),
    async function (req, res) {
        const resPerPage = parseInt(req.query.resPerPage || 9); // results per page
        const page = parseInt(req.query.page || 1); // Page 
        console.log('get all hotel groups:', resPerPage, page);
        try {
            let groups = await HotelGroupModel
                .find({})
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage)
                .lean()
                .exec();
            console.log(groups);
            return res.status(200).send(groups);
        } catch (error) {
            console.log('error in getting all hotel groups.', error);
            return res.status(400).send(error);
        }
    });

/**
* @param group_id
* @returns updated group object
*/
router.put('/:group_id',
    auth0.authenticate,
    auth0.authorize('update:group'),
    async function (req, res) {
        console.log('updating group ' + req.params.facility_id);

        try {
            validationResult(req).throw();
        } catch (error) {
            return res.status(422).send(error);
        }

        let facility_id = req.params.facility_id, u = req.body;

        try {
            // Update facility object
            await FacilityModel.update({ _id: facility_id }, { $set: u }).exec();

            return res.status(200).send({ facility_id: facility_id });
        } catch (error) {
            console.log('error in updating facility', facility_id);
            res.status(500).send(error);
        }
    });
module.exports = router;