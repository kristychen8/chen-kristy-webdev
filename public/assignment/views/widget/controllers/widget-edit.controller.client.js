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
        var w = {};

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
            model.widget = {};
            w = WidgetService.findWidgetById(model.widgetId);
            angular.copy(w, model.widget);
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
        }

        function updateWidget() {
            WidgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/' + model.uid + '/website/' + model.wid + '/page/' + model.pid + '/widget');
        }
    }
})();