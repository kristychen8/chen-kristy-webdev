var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.put("/api/page/:pageId/widget", sortableWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);


var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "Lorem ipsum"},
    {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "name": "Lorem ipsum", "text": "Lorem ipsum"},
    // {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name": "Lorem ipsum"},
    {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "name": "Lorem ipsum", "text": "Lorem ipsum"}
    // {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
}

function findWidgetsByPageId(req, res) {
    var results = [];
    var pageId = req.params['pageId'];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            results.push(widgets[w]);
        }
    }
    res.json(results);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.send(widget);
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    for(var w in widgets) {
        if(widgetId === widgets[w]._id) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}

function sortableWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    var widgetsInPage = [];
    var widgetsNotInPage = [];


    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            widgetsInPage.push(widgets[w]);
        }
        else {
            widgetsNotInPage.push(widgets[w]);
        }
    }
    widgets=[];

    widgetsInPage.splice(final, 0, widgetsInPage.splice(initial, 1)[0]);

    widgets = widgetsInPage;
    widgets.concat(widgetsNotInPage);
    res.sendStatus(200);

}

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if (req.file) {
        var width = req.body.width;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        // widget = getWidgetById(widgetId);
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });

        widget.url = '/assignment/uploads/' + filename;
        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
    }
    else {
    }
}