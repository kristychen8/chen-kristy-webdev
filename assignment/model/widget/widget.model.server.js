var mongoose = require('mongoose');
var pageSchema = require('../page/page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
             pageModel.addWidget(pageId, widget._id);
            return widget;
        })
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});

}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {$set: widget})
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
             pageModel
                .deleteWidget(widgetId);
        });
}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId})
        .sort({index: 1})
        .then(function (widgets) {
            if(widgets[0].index === -1) {
                for (var w in widgets) {
                    widgets[w].index = w;
                }
            }
            for (var w in widgets) {
                if (start > end) {
                    if (w === start)
                        widgets[w].index = end;
                    else if (w <= start && w >= end)
                        widgets[w].index = widgets[w].index + 1;
                    else
                        widgets[w].index = w;
                }
                else {
                    if (w === start)
                        widgets[w].index = end;
                    else if (w >= start && w <= end)
                        widgets[w].index = widgets[w].index - 1;
                    else
                        widgets[w].index = w;
                }
                widgets[w].save();
            }
        });
}