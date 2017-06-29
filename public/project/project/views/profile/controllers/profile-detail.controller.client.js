(function () {
    angular
        .module('MovieTag')
        .controller('ProfileDetailControllerMovieTag', ProfileDetailControllerMovieTag);

    function ProfileDetailControllerMovieTag($rootScope, $routeParams, UserServiceMovieTag, $location, ListServiceMovieTag) {
        var vm = this;

        vm.pid = $routeParams['pid'];
        vm.mid = $routeParams['mid'];
        vm.uid = $rootScope.currentUser._id;
        vm.fromProfile = $routeParams['p'];
        vm.followed = false;


        vm.follow = follow;

        function init() {
            UserServiceMovieTag
                .findUserByUsername(vm.pid)
                .then(function (user) {
                    vm.user = user;
                    ListServiceMovieTag
                        .findListByUser(vm.user._id)
                        .then(function (list) {
                            vm.list = list;
                            vm.profilelistId = list[0]._id;
                            ListServiceMovieTag
                                .findListWithSpecificItem(vm.profilelistId, vm.uid, "followers")
                                .then(function (list) {
                                    if (list.length !== 0)
                                        vm.followed = true;
                                })
                        });
                });

            ListServiceMovieTag
                .findListByUser(vm.uid)
                .then(function (list) {
                    vm.listId = list[0]._id;
                });
        }
        init();

        function follow(){
            var following = {
                id: vm.user._id,
                username: vm.user.username
            };
            var follower = {
                id: vm.uid,
                username: $rootScope.currentUser.username
            };
            vm.followed = !vm.followed;
            ListServiceMovieTag
                .findListWithSpecificItem(vm.listId, vm.user._id,"following")
                .then(function(list) {
                    if (list.length !== 0) {
                        ListServiceMovieTag
                            .removeItemFromSpecificList(vm.listId, vm.user._id, "following")
                            .then(function() {
                                ListServiceMovieTag
                                    .removeItemFromSpecificList(vm.profilelistId, vm.uid, "followers");
                            });
                    }
                    else{
                        ListServiceMovieTag
                            .addItemToSpecificList(vm.listId,"following", following)
                            .then(function () {
                                ListServiceMovieTag
                                    .addItemToSpecificList(vm.profilelistId,"followers", follower)
                            });
                    }
                })
        }
    }
})();
