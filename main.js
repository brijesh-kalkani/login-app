var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "/components/login/login.component.html",
    })
    .when("/signup", {
      templateUrl: "/components/signup/signup.component.html",
    })
    .when("/", {
      templateUrl: "/components/login/login.component.html",
    })
    .when("/home",{
      templateUrl: "/components/home/home.component.html"
    }
    );
});

app.controller("loginCtl", ($scope) => {
  $scope.getUser = function () {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    // console.log($scope.username)
    if(loginData){
      let length = Object.keys(loginData).length;
      for(let i=0; i < length;i++){
        if(loginData[i].username == $scope.username && loginData[i].password == $scope.password){
          console.log("login True")
          localStorage.setItem('login',JSON.stringify({
            username:$scope.username,
            password:$scope.password,
            key:i
          }))
          location.hash = '#!/home'
        }
        
      }
    }
  };
});

app.controller("homeCtl",($scope)=>{
  let loginData = JSON.parse(localStorage.getItem('login'))
  if(loginData){
    $scope.username = loginData.username
  }else{
    location.hash ='/login'
  }
  $scope.logout = () =>{
    localStorage.removeItem('login')
    location.hash = '/'
  }
})

const saveData = (username, password, email, mobilenumber, isFirst) => {
  if (isFirst) {
    localStorage.setItem(
      "loginData",
      JSON.stringify({
        '0': {
          username: username,
          password: password,
          mobilenumber: mobilenumber,
          email: email,
        },
      })
    );
  } else {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    let key1 = Object.keys(loginData).length;
    loginData[`${key1}`] = {
      username: username,
      password: password,
      mobilenumber: mobilenumber,
      email: email,
    };

    localStorage.setItem(
      "loginData",
      JSON.stringify({
        ...loginData
      })
    );
  }
};

app.controller("signupCtl", ($scope) => {
  $scope.registerUser = function () {
    console.log(
      $scope.username,
      $scope.password,
      $scope.email,
      $scope.mobilenumber
    );
    if (!localStorage.getItem("loginData") && $scope.username && $scope.password && $scope.email && $scope.mobilenumber) {
      saveData(
        $scope.username,
        $scope.password,
        $scope.email,
        $scope.mobilenumber,
        true
      );
      location.hash ='/login'
    } else {
      saveData(
        $scope.username,
        $scope.password,
        $scope.email,
        $scope.mobilenumber,
        false
      );
      location.hash ='/login'
    }
  };
});
