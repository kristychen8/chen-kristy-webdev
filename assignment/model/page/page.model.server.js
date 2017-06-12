var mongoose = require('mongoose');
var websiteSchema = require('../website/website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var widgetSchema = require('../widget/widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.deleteWidget = deleteWidget;
pageModel.addWidget = addWidget;

module.exports = pageModel;


function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);

}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function(widgets) {
            for (w in widgets) {
                var wgid = widgets[w]._id;
                widgetModel.deleteWidget(wgid);
            }
        });

    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(pageId);
        });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(widgetId) {
    return pageModel
        .findOne({widgets: widgetId})
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}
