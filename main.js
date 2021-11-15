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
      templateUrl: "/components/home/home.component.html",
    })
    .when("/home", {
      templateUrl: "/components/home/home.component.html",
    });
});

const redirectTo = (url) => {
  location.hash = url;
};

const checkIsLogin = (signup = "#!/login") => {
  let loginData = JSON.parse(localStorage.getItem("login"));
  if (loginData) {
    redirectTo("#!/home");
    return loginData.username;
  } else {
    redirectTo(signup);
  }
};

const saveData = (username, password, email, mobilenumber, isFirst) => {
  let loginData = isFirst ? {}:JSON.parse(localStorage.getItem("loginData"));
  if (loginData[username]) {
    console.log('user already exists')
    return "#!/signup"
  }
  loginData[username] = {
    username: username,
    password: password,
    mobilenumber: mobilenumber,
    email: email,
  };
  localStorage.setItem("loginData", JSON.stringify(loginData));
  return "#!/login"
};

app.controller("loginCtl", ($scope) => {
  checkIsLogin();
  $scope.getUser = function () {
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData) {
      if (
        loginData[$scope.username].username == $scope.username &&
        loginData[$scope.username].password == $scope.password
      ) {
        localStorage.setItem("login",JSON.stringify(loginData[$scope.username]));
        redirectTo("#!/home");
      } else {
        console.log("user does not exist");
      }
    }
  };
});

app.controller("homeCtl", ($scope) => {
  $scope.username = checkIsLogin();
  $scope.logout = () => {
    localStorage.removeItem("login");
    redirectTo("#!/login");
  };
});

app.controller("signupCtl", ($scope) => {
  checkIsLogin("#!/signup");
  $scope.registerUser = function () {
    let loginData = !localStorage.getItem("loginData");
    if (
      $scope.username &&
      $scope.password &&
      $scope.email &&
      $scope.mobilenumber
    ) {
      redirectTo(saveData(
        $scope.username,
        $scope.password,
        $scope.email,
        $scope.mobilenumber,
        loginData
      ));
    }
  };
});
