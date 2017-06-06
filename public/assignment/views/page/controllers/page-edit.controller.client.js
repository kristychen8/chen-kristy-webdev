(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var model = this;
        model.uid = $routeParams['uid'];
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
            if (model.page.name === "" || model.page.description === "") {
                model.message = "Must have name and description";
            } else {
                PageService
                    .updatePage(model.pageId, model.page)
                    .then(function() {
                        $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
                    });
            }
        }

        function deletePage() {
            PageService
                .deletePage(model.pageId)
                .then(function() {
                    $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
                });
        }

    }
})();