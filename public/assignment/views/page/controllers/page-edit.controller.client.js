(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(currentUser, $location, $routeParams, PageService, $scope) {
        var model = this;
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        PageService
            .findPageByWebsiteId(model.wid)
            .then(function (pages) {
                model.pages = pages;
            });
        PageService
            .findPageById(model.pageId)
            .then(function (page) {
                model.page = page;
            });

        function updatePage() {
            $scope.pagepage.submitted = true;
            if (model.page.name === "" || model.page.name === undefined) {
                model.message = "Must have name";
            } else {
                PageService
                    .updatePage(model.pageId, model.page)
                    .then(function() {
                        $location.url('/website/' + model.wid + '/page');
                    });
            }
        }

        function deletePage() {
            PageService
                .deletePage(model.pageId)
                .then(function() {
                    $location.url('/website/' + model.wid + '/page');
                });
        }

    }
})();