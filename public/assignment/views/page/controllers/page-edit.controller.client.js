(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function  EditPageController ($location, $routeParams, PageService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        var p = {};

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.wid);
            model.page = {};
            p = PageService.findPageById(model.pageId);
            angular.copy(p, model.page);
        }
        init();

        function updatePage() {
            if (model.page.name === "" || model.page.description === "") {
                model.message = "Must have name and description";
            } else {
                PageService.updatePage(model.pageId, model.page);
                $location.url('/user/'+ model.uid +'/website/' + model.wid + '/page');
            }
        }

        function deletePage() {
            PageService.deletePage(model.pageId);
            $location.url('/user/'+ model.uid +'/website/' + model.wid + '/page');
        }

    }
})();