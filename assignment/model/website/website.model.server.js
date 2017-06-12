var mongoose = require('mongoose');
var userSchema = require('../user/user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var pageSchema = require('../page/page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.deletePage = deletePage;
websiteModel.addPage = addPage;

module.exports = websiteModel;


function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId) {
    pageModel.findAllPagesForWebsite(websiteId)
        .then(function(pages) {
            for (p in pages) {
                var pid = pages[p]._id;
                pageModel.deletePage(pid);
            }
        });

    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.deleteWebsite(websiteId);

        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function deletePage(pageId) {
    return websiteModel
        .findOne({pages: pageId})
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}