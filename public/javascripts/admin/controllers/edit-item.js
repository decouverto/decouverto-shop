module.exports = ['$scope', '$http', '$rootScope', 'notie', '$routeParams', '$location', function ($scope, $http, $rootScope, notie, $routeParams, $location) {
    $scope.tinymceOptions = {
        inline: false,
        skin: 'lightgray',
        theme: 'modern'
    };
    $scope.lpath = '/list-items'
    $scope.edit = true;

    $scope.now = new Date();
    $scope.item = { description: '', title: '', price: 0 };
    
    $http.get('/api/items/' + $routeParams.id).success(function (item) {
        $scope.item = item;
        $scope.invalidForm = function () {
            var invalid = false;
            if ($scope.item.description == '') {
                invalid = true;
            }
            if ($scope.item.title == '') {
                invalid = true;
            }
            if ($scope.item.price == '') {
                invalid = true;
            }
            $scope.invalid = invalid;
        };
        $scope.invalid = false;
    }).error($rootScope.$error);

    $scope.invalidForm = function () {
        return true
    };
    $scope.invalid = true;

    $scope.publish = function () {
        $scope.progress = true
        $http.post('/api/items/', $scope.item).success(function (data) {
            notie.alert(1, 'L\'article a été ajouté.', 3);
            $scope.progress = false;
            $location.path('/edit-item/' + data._id);
        }).error(function () {
            $rootScope.$error();
            $scope.progress = false;
        });
    };
}];