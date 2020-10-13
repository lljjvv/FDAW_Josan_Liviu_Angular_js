var app = angular.module('myApp', []);

app.directive('myDirective', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.length > 3) {

                    if (value == 'admin') {
                        console.log('if');
                        mCtrl.$setValidity('charE', true);
                    } else {
                        console.log('else');
                        mCtrl.$setValidity('charE', false);
                    }
                    return value;
                }
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.service('authorize', function () {
    this.auth2 = function (username, password) {
        let user = 'admin';
        let pass = 'admin';
        if ((username == user) && (password == pass)) {
            return true;
        }
        return false;
    }
});

app.controller('myCtrl', function ($scope, $interval, authorize) {
    $scope.furnitures = [
        { id: '1', name: 'table', alt: 'furniture', img_path: 'images/img_1.jpg' },
        { id: 'uniq', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_2.jpg' },
        { id: '2', name: 'sofa', alt: 'furniture', img_path: 'images/img_3.jpg' },
        { id: 'id', name: 'table', alt: 'furniture', img_path: 'images/img_4.jpg' },
        { id: '3', name: 'chair', alt: 'furniture', img_path: 'images/img_5.jpg' },
        { id: 'test', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_6.jpg' },
        { id: '4', name: 'table', alt: 'furniture', img_path: 'images/img_7.jpg' },
        { id: 'qwer', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_10.jpg' },
        { id: '5', name: 'sofa', alt: 'furniture', img_path: 'images/img_9.jpg' },
        { id: 'asdf', name: 'table', alt: 'furniture', img_path: 'images/img_10.jpg' },
        { id: '6', name: 'sofa', alt: 'furniture', img_path: 'images/img_3.jpg' },
        { id: 'asd', name: 'chair', alt: 'furniture', img_path: 'images/img_12.jpg' },
        { id: '7', name: 'table', alt: 'furniture', img_path: 'images/img_13.jpg' },
        { id: 'xzcv', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_1.jpg' },
        { id: '8', name: 'sofa', alt: 'furniture', img_path: 'images/img_2.jpg' },
        { id: 'zxvc', name: 'chair', alt: 'furniture', img_path: 'images/img_4.jpg' },
        { id: '9', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_6.jpg' },
        { id: 'qdqe', name: 'chair', alt: 'furniture', img_path: 'images/img_7.jpg' },
        { id: '10', name: 'wardrobe', alt: 'furniture', img_path: 'images/img_5.jpg' },
        { id: 'gtgy', name: 'chair', alt: 'furniture', img_path: 'images/img_3.jpg' },
        { id: '11', name: 'chair', alt: 'furniture', img_path: 'images/img_10.jpg' },
    ];

    $scope.news = [
        { title: 'Sales', link: 'https://zen.yandex.ru/id/5bbc79352daf7800aa370e61', img_path: 'images/news1.jpg' },
        { title: 'New brand', link: 'https://zen.yandex.ru/id/5bbc79352daf7800aa370e61', img_path: 'images/news2.jpg' },
        { title: 'New Furniture3', link: 'https://zen.yandex.ru/id/5bbc79352daf7800aa370e61', img_path: 'images/news1.jpg' },
        { title: 'New Furniture4', link: 'https://zen.yandex.ru/id/5bbc79352daf7800aa370e61', img_path: 'images/news2.jpg' }
    ];


    $scope.name = "";
    $scope.login = false;
    $scope.send = false;
    $scope.show_message = true


    $scope.hint = '';

    $scope.showHint = () => {
        $scope.hint = 'Login/password = admin';
    }

    // Service interval drop logined user every 15 minute

    $interval(function () {
        if ($scope.login == true) {
            alert('You was sign out by service $interval!');
            $scope.login = false;
        }
    }, 300000);

    $scope.user = "admin";
    $scope.pass = "admin";

    $scope.auth = () => {
        console.log('auth1');
        if (authorize.auth2($scope.username, $scope.password)) {
            $scope.username = '';
            $scope.password = '';
            $scope.login = true;

        }

    }

    $scope.addItem = () => {
        let item = {
            id: makeid(3),
            name: $scope.item_name,
            alt: 'furniture',
            img_path: $scope.item_img_path
        }
        let added = $scope.furnitures.splice(0, 0, item);
        $scope.item_name = '';
        $scope.item_img_path = '';
        hideModal('addItem');
    }

    $scope.deleteItem = function (id) {
        let index = $scope.furnitures.findIndex(x => x.id === id);
        $scope.furnitures.splice(index, 1);
    }

    $scope.ShowMessage = () => {
        if ($scope.show_message == true) {
            alert('Subject is not required');
            $scope.show_message = false;
        }
    }
});

const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const hideModal = (id) => {
    $('#' + id).modal('hide')
}