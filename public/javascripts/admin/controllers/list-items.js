module.exports = ['$scope', '$http', '$rootScope', 'notie', '$location', function ($scope, $http, $rootScope, notie, $location) {
    
    $http.get('/api/items').success(function(items) {
        $scope.items=items;
    }).error($rootScope.$error);

    $scope.removeItem = function (id) {
        notie.confirm('Êtes-vous sûre de vouloir supprimer cet article ?', 'Oui', 'Annuler', function() {
            $http.delete('/api/items/' + id).success(function() {
                notie.alert(1, 'L\'article a été supprimé avec succès.', 3);
                $location.path('/');
            }).error($rootScope.$error);
        });
    };
}];