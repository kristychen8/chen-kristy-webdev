(function () {
    angular
        .module('MovieTag')
        .controller('DetailController', DetailController);

    function DetailController ($routeParams, pocService) {
        var model = this;
        model.mid = $routeParams['mid'];
        model.detail = {};

        pocService
                .movieDetails(model.mid)
                .then(function(response) {
                    model.detail = response.data;
                });

    }
})();
