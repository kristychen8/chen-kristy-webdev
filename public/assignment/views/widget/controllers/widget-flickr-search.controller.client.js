(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController (FlickrService, WidgetService, $location, $routeParams) {
        var model = this;

        model.pageId = $routeParams.pid;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.widgetId = $routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    widget.url = url;
                    WidgetService
                        .updateWidget(model.widgetId, widget)
                        .then(function () {
                            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
                        });
                });
        }

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

    }
})();
