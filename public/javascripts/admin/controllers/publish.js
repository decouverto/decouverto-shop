module.exports = ['$scope', 'Upload', 'notie', '$location', function ($scope, Upload, notie, $location) {
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
        $scope.progress = true;
        var obj = $scope.item;
        obj.file = $scope.content;
        Upload.upload({
            url: '/api/items/',
            data: obj
        }).then(function () {
            notie.alert(1, 'Le fichier a été sauvegardé.', 3);
            $location.path('/');
        }, function () {
            $scope.progress = false;
            notie.alert(3, 'Une erreur a eu lieu lors de l\'envoie du fichier.', 3);
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };
}];