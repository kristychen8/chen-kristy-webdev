(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController(currentUser, $location, $routeParams, PageService, $scope) {
        var model = this;
        model.uid = currentUser._id;
        model.wid = $routeParams['wid'];

        model.createPage = createPage;
        model.clearForm = clearForm;

        PageService
            .findPageByWebsiteId(model.wid)
            .then(renderPages);

        function createPage(newPage) {
            $scope.pagepage.submitted = true;
            if (newPage === undefined) {
                model.message = "Must have name";
            }
            else if (newPage.name === undefined || newPage.name === "") {
                model.message = "Must have name";
            }
            else {
                var page = {
                    name: newPage.name,
                    description: newPage.description
                };
                PageService
                    .createPage(model.wid, page)
                    .then(function() {
                        $location.url('/website/' + model.wid + '/page');
                    });
            }
        }

        function clearForm(p) {
            $scope.pagepage.submitted = false;
            model.message = null;
            if (p !== undefined) {
                p.name = undefined;
                p.description = undefined;
            }
        }

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();