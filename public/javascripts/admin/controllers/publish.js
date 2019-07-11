module.exports = ['$scope', '$http', '$rootScope', 'notie', '$location', function ($scope, $http, $rootScope, notie, $location) {
    $scope.tinymceOptions = {
        inline: false,
        skin: 'lightgray',
        theme: 'modern'
    };
    $scope.lpath = '/';
    $scope.edit = false;
    $scope.invalid = true;
    $scope.item = { description: '', title: '', price: 0 };

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

    $scope.publish = function () {
        // TODO: add upload file
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