(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController(currentUser, $location, $routeParams, WidgetService, $scope) {
        var model = this;
        model.uid = currentUser._id;
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
                    $location.url('/website/' + model.wid + '/page/' + model.pid + '/widget');
                });
        }

        function updateWidget() {
            $scope.widgetpage.submitted = true;
            if (model.widget.name === undefined) {
                model.message = "Must have name";
            }
            else if (model.widget.name === undefined || model.widget.name === "") {
                model.message = "Must have name";
            }
            else {
                WidgetService
                    .updateWidget(model.widgetId, model.widget)
                    .then(function () {
                        $location.url('/website/' + model.wid + '/page/' + model.pid + '/widget');
                    });
            }
        }
    }
})();