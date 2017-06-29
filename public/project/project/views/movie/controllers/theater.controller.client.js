(function () {
    angular
        .module('MovieTag')
        .controller('TheaterControllerMovieTag', TheaterControllerMovieTag);

    function TheaterControllerMovieTag($routeParams, MovieServiceMovieTag, $location, UserService) {
        var vm = this;
        vm.tid = $routeParams['tid'];
        vm.showtimes = {};
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (day < 10) {
            day = '0' + day
        }

        if (month < 10) {
            month = '0' + month
        }
        var date = year + '-' + month + '-' + day;

        MovieServiceMovieTag
            .searchShowtimes(vm.tid, date)
            .then(function (response) {
                vm.showtimes = response.data;
                console.log(vm.showtimes);
            });


    }
})();
