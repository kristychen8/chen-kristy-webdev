(function () {
    angular
        .module("MovieTag")
        .factory("ListServiceMovieTag", ListServiceMovieTag);

    function ListServiceMovieTag($http) {
        var api = {
            "createList": createList,
            "findListByUser": findListByUser,
            "findListById": findListById,
            "findListWithSpecificItem": findListWithSpecificItem,
            "addItemToSpecificList": addItemToSpecificList,
            "removeItemFromSpecificList": removeItemFromSpecificList,
            "updateRated": updateRated
        };
        return api;

        function createList(list) {
            var url = "/api/movietag/user/list";
            return $http.post(url, list)
                .then(function (response) {
                    return response.data;
                });
        }

        function findListByUser(userId) {
            var url = "/api/movietag/user/" + userId +"/list";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findListById(listId) {
            var url = "/api/movietag/list/" + listId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findListWithSpecificItem(listId, id, list) {
            var url = "/api/movietag/list/" + listId + "/type/" + list + "/" + id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addItemToSpecificList(listId, list, array) {
            var url = "/api/movietag/list/" + listId + "/type/" + list;
            return $http.post(url, array)
                .then(function (response) {
                    return response.data;
                })
        }

        function removeItemFromSpecificList(listId, id, list) {
            var url = "/api/movietag/list/" + listId + "/type/" + list + "/" + id;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateRated(listId, mid, rate) {
            var url = "/api/movietag/list/" + listId + "/type/rate/" + mid;
            console.log(rate);
            return $http.put(url, rate)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();