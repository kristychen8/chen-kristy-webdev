(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function  PageListController (currentUser, $routeParams, PageService) {
        var model = this;

        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];

       PageService
           .findPageByWebsiteId(model.wid)
           .then(function(pages) {
               model.pages = pages;
           });
    }
})();