(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        model.createPage = createPage;
        model.clearForm = clearForm;

        PageService
            .findPageByWebsiteId(model.wid)
            .then(renderPages);

        function createPage(newPage) {
            if (newPage === undefined) {
                model.message = "Must have name and title";
            }
            else if ((newPage.name === undefined || newPage.name === "") || (newPage.description === undefined || newPage.description === "")) {
                model.message = "Must have name and title";
            }
            else {
                var page = {
                    name: newPage.name,
                    description: newPage.description
                };
                PageService
                    .createPage(model.wid, page)
                    .then(function() {
                        $location.url('/user/' + model.uid + '/website/' + model.wid + '/page');
                    });
            }
        }

        function clearForm(p) {
            if (p !== undefined) {
                p.name = undefined;
                p.description = undefined;
                model.message = null;
            }
        }

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();