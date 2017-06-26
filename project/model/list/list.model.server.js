var mongoose = require('mongoose');
var listSchema = require('./list.schema.server');
var ListModelProject = mongoose.model('ListModelProject', listSchema);
var userSchema = require('../user/user.schema.server');
var UserModelProject = mongoose.model('UserModelProject', userSchema);
// ListModelProject.createPage = createPage;
// ListModelProject.findAllPagesForWebsite = findAllPagesForWebsite;
// ListModelProject.findPageById = findPageById;
// ListModelProject.updatePage = updatePage;
// ListModelProject.deletePage = deletePage;
// ListModelProject.deleteWidget = deleteWidget;
// ListModelProject.addWidget = addWidget;

module.exports = ListModelProject;

//
// function createPage(websiteId, page) {
//     page._website = websiteId;
//     return pageModel
//         .create(page)
//         .then(function (page) {
//             return websiteModel
//                 .addPage(websiteId, page._id)
//         })
// }
//
// function findAllPagesForWebsite(websiteId) {
//     return pageModel.find({_website: websiteId});
// }
//
// function findPageById(pageId) {
//     return pageModel.findById(pageId);
//
// }
//
// function updatePage(pageId, page) {
//     return pageModel.update({_id: pageId}, {$set: page});
// }
//
// function deletePage(pageId) {
//     widgetModel.findAllWidgetsForPage(pageId)
//         .then(function(widgets) {
//             for (w in widgets) {
//                 var wgid = widgets[w]._id;
//                 widgetModel.deleteWidget(wgid);
//             }
//         });
//
//     return pageModel
//         .remove({_id: pageId})
//         .then(function (status) {
//             return websiteModel
//                 .deletePage(pageId);
//         });
// }
//
// function addWidget(pageId, widgetId) {
//     return pageModel
//         .findById(pageId)
//         .then(function (page) {
//             page.widgets.push(widgetId);
//             return page.save();
//         });
// }
//
// function deleteWidget(widgetId) {
//     return pageModel
//         .findOne({widgets: widgetId})
//         .then(function (page) {
//             var index = page.widgets.indexOf(widgetId);
//             page.widgets.splice(index, 1);
//             return page.save();
//         });
// }
