(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($location, $routeParams, WidgetService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        WidgetService
            .findWidgetsByPageId(model.pid)
            .then(function (widgets) {
                model.widgets = widgets;
            });
        WidgetService
            .findWidgetById(model.widgetId)
            .then(function (widget) {
                model.widget = widget;
            });

        function deleteWidget() {
            WidgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                });
        }

        function updateWidget() {
            WidgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
                });
        }
    }
})();