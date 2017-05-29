(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createWidget = createWidget;

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
        }
        init();

        function createWidget(string) {
            var widget = {
                widgetType: string,
                name: 'New Name',
                text: 'New Text'
            };
            if (string === 'HEADING') {
                widget.size = 1;
            }
            else if (string === 'YOUTUBE') {
                widget.url = 'https://www.youtube.com/embed/PAkxgIKJxRE';
                widget.width = '100%';
            }
            else if (string === 'IMAGE') {
                widget.url = 'http://lorempixel.com/400/200/';
                widget.width = '100%';
            }
            WidgetService.createWidget(model.pid, widget);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id);
        }
    }
})();