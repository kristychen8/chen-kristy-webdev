(function () {
    angular
        .module('MovieTag')
        .controller('ShowtimeController', ShowtimeController);

    function ShowtimeController ($routeParams, pocService) {
        var model = this;
        model.tid = $routeParams['tid'];
        model.showtimes = {};
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if(day<10) {
            day='0'+day
        }

        if(month<10) {
            month='0'+month
        }
        var date = year+'-'+month+'-'+day;

        pocService
            .searchShowtimes(model.tid, date)
            .then(function(response) {
                model.showtimes = response.data;
                console.log(model.showtimes);
            });

    }
})();


