(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(currentUser, $location, $routeParams, WidgetService) {
        var model = this;
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        model.createWidget = createWidget;

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
            else if (string === 'TEXT') {
                widget.placeholder = "placeholder"
            }
            WidgetService
                .createWidget(model.pid, widget)
                .then(function(w) {
                    $location.url('/website/' + model.wid + '/page/' + model.pid + '/widget/' + w._id);
                });
        }
    }
})();