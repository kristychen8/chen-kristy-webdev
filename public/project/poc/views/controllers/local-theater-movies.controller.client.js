(function () {
    angular
        .module('MovieTag')
        .controller('TheaterController', TheaterController);

    function TheaterController(pocService) {
        var model = this;
        model.searchTheater = searchTheater;

        function searchTheater(zipcode) {
            pocService
                .searchTheaters(zipcode)
                .then(function (response) {
                    if (response.data === "") {
                        model.alert = "Zip Code does not exist";
                        model.theaters = "";
                    }
                    else {
                        model.alert = false;
                        model.theaters = response.data;
                    }
            });
        }
    }
})();
