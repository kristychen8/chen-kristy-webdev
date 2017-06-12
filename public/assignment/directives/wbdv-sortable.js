(function () {
        angular
            .module('wbdvDirectives', ['WebAppMaker'])
            .directive('wbdvSortable', wbdvSortable);

        function wbdvSortable($routeParams, WidgetService) {
            function linkFunction(scope, element) {
                var pageId = $routeParams.pid;
                var initial = -1;
                var final = -1;

                $(element).sortable({
                    axis: 'y',
                    cursor: 'move',
                    tolerance: 'touch',
                    start: function (event, ui) {
                        initial = ui.item.index();
                    },
                    stop: function (event, ui) {
                        final = ui.item.index();
                        WidgetService
                            .sortableWidget(pageId, initial, final)
                            .then(function () {
                            });
                    }
                });
            }

            return {
                link: linkFunction
            }
        }

    })();