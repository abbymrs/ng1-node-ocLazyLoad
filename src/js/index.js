let app = angular.module('app', [
    'ui.router',
    'oc.lazyLoad'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
            url: '/home',
            template: `
                <div>Home page</div>
            `,
            controller: 'HomeCtrl'
        })
            .state('message', {
                url: '/message',
                template: `
                <div>message page</div>
            `,
                controller: 'MsgCtrl'
            })
            .state('login', {
                url: '/login',
                template: `
                <div>
                    <div class="form-group">
                        <label for="name">User Name: </label>
                        <input type="text" id="name" name="username" ng-model="username" class="form-control" placeholder="pls enter your user name">
                    </div>
                    <div class="form-group">
                        <label for="psd">password: </label>
                        <input type="password" id="psd" name="psd" ng-model="psd" class="form-control" placeholder="pls enter your password">
                    </div>
                    <input type="button" class="btn btn-info" value="log in" ng-click="login()">
                </div>
            `,
                controller: 'LoginCtrl',
                resolve: {
                    loadUtil: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('js/util.js');
                    }
                }
            })
    })
    .run(function () {

    })
    .controller('mainCtrl', function ($scope, $http, $state) {

        $scope.goLogin = (e) => {
            e.preventDefault();
            $http.get('/message')
                .then(res => {
                    // console.log(res);
                    if (res.data.isLogin == true) {
                        $state.go('message');
                    } else {
                        $state.go('login');
                    }
                })
                .catch(err => console.log(err));
        };
        

        $scope.logout = (e) => {
            e.preventDefault();
            $http.get('/logout')
                .then(res => {
                    $state.go('home');
                })
                .catch(err => console.log(err));
        };
    })
    .controller('HomeCtrl', function ($scope) {
        // console.log('home ctrl');
    })
    .controller('MsgCtrl', function ($scope) {
        // console.log('msg ctrl');
    })
    .controller('LoginCtrl', function ($scope, $http, $state, loadUtil, util) {
        isLogin = false;
        app.requires.push(loadUtil[0]);
        // console.log(app.requires);
        // console.log(util.popInfo);

        $scope.login = () => {
            let data = {
                username: $scope.username,
                psd: $scope.psd
            };
            $http.post('/login', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    // console.log(res);
                    let data = res.data;
                    if (data.status == 1) {
                        $state.go('message');
                    } else {
                        $scope.psd = '';
                    }
                    util.popInfo(data.content.msg, 2000);
                })
                .catch(err => console.log(err));
            // util.popInfo('login successfully~',2000);
        };

        // console.log($state.current.url);
    })