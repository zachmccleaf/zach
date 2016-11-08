

(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);

(function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this);
(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);

(function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this);
(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);

(function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,
d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this);
(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);

(function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,
d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),
angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this);
(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);

(function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,
d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),
angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),
angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),
a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{
templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this),function(){var a,b,c,d,e;e=me.zach.webApp,b=e.controllers,d=e.services,c=e.directives,a=e.app=angular.module("webApp",["angular.filter","ngRoute","webApp.controllers","webApp.services"]),angular.module("webApp.controllers",[]).controller("mainController",b.MainController),angular.module("webApp.services",[]).service("projectService",d.ProjectService).service("anchorScrollService",d.AnchorScrollService).service("expertiseService",d.ExpertiseService),a.config(["$routeProvider",function(a){return a.when("/",{templateUrl:"/home.html",controller:"mainController",controllerAs:"con"
}).otherwise({redirectTo:"/"})}])}.call(this),function(){var a,b;b=me.zach.webApp,a=b.controllers,a.LoginController=function(){function a(a){}return a.$inject=["$scope","$rootScope"],a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp,a=b.controllers,a.MainController=function(){function a(a,b,d,e,f){this.scrollToProject=c(this.scrollToProject,this),this._anchorScrollService=e,this.projects=b.getProjects(),this.expertise=d.getExpertise(),a.isScrolled=!1,$(document).on("scroll",function(){return $("header").outerHeight()<$(document).scrollTop()?a.$apply(function(){return a.isScrolled=!0}):a.$apply(function(){return a.isScrolled=!1})})}return a.prototype._anchorScrollService=null,a.prototype._expertiseService=null,a.prototype.projects=null,a.prototype.expertise=null,a.$inject=["$scope","projectService","expertiseService","anchorScrollService","$document"],a.prototype.scrollToProject=function(a){return this._anchorScrollService.scrollTo(a)},a}()}.call(this),function(){var a,b;b=me.zach.webApp.directives,a=me.zach.webApp.app,b.HeaderDirective=function(){function a(){this._initialize()}return a.prototype._initialize=function(){return console.log("test")},a}()}.call(this),function(){var a,b,c;null==window.me&&(window.me={}),null==me.zach&&(me.zach={}),null==(a=me.zach).webApp&&(a.webApp={}),null==(b=me.zach.webApp).controllers&&(b.controllers={}),null==(c=me.zach.webApp).services&&(c.services={})}.call(this),function(){var a,b;b=me.zach.webApp.services,a=me.zach.webApp.app,b.anchorScrollService=function(){function a(){}return a.prototype._initialize=function(){},a.scrollTo=function(a){var b,c,d,e,b,f,g,h,i,j,k,l;if(i=c(),k=e(a),d=k>i?k-i:i-k,c=function(){return self.pageYOffset?self.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0},e=function(a){var b,c,d;for(b=document.getElementById(a),d=b.offsetTop,c=b;c.offsetParent&&c.offsetParent!==document.body;)c=c.offsetParent,d+=c.offsetTop;return d},d<100)return void scrollTo(0,k);if(h=Math.round(d/100),h>=20&&(h=20),j=Math.round(d/25),f=k>i?i+j:i-j,l=0,!(k>i)){for(b=i,g=[];b>k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f-=j,f<k&&(f=k),l++,g.push(b-=j);return g}for(b=i;b<k;)setTimeout("window.scrollTo(0, "+f+")",l*h),f+=j,f>k&&(f=k),l++,b+=j},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.AnchorScrollService=function(){function a(){this.scrollTo=c(this.scrollTo,this)}return a.prototype._initialize=function(){},a.prototype.scrollTo=function(a){var b,c,d;return b=$(event.currentTarget),d=b.attr("class"),c=$(".block."+d).position().top,$("html, body").animate({scrollTop:c-100},600),!1},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ExpertiseService=function(){function a(){this.getExpertise=c(this.getExpertise,this)}return a.prototype._initialize=function(){},a.prototype.getExpertise=function(){return[{type:"idea",name:"Collaboration"},{type:"idea",name:"Communication"},{type:"ux",name:"Wireframing"},{type:"ux",name:"Content Structure"},{type:"ux",name:"Design"},{type:"development",name:"Database"},{type:"development",name:"Front-End"},{type:"development",name:"Back-End"}]},a}()}.call(this),function(){var a,b,c=function(a,b){return function(){return a.apply(b,arguments)}};b=me.zach.webApp.services,a=me.zach.webApp.app,b.ProjectService=function(){function a(){this.getProjects=c(this.getProjects,this)}return a.prototype._initialize=function(){},a.prototype.getProjects=function(){return[{id:1,projectName:"Commonwealth Charter Academy",role:"Front-End Developer",desc:"CCA is a K-12 public cyber charter school in Pennsylvania. ",linkHref:"https://ccaeducate.me/",mobileImg:"mobile-cca.png",desktopImg:"laptop-cca.png",type:"Education",agency:"Andculture"},{id:2,projectName:"Eliance Health Solutions",role:"Front-End/Back-End Developer",desc:"Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ",linkHref:"http://eliancehealthsolutions.org/",mobileImg:"mobile-ehs.png",desktopImg:"laptop-ehs.png",type:"Healthcare",agency:"Andculture"},{id:3,projectName:"Pinnacle Health",role:"Front-End Developer",desc:"Pinnacle Health is a top-rated healthcare system in south-central PA. ",linkHref:"https://www.pinnaclehealth.org/",mobileImg:"mobile-pinnacle.png",desktopImg:"laptop-pinnacle.png",type:"Healthcare",agency:"Andculture"},{id:4,projectName:"Mount Nittany Health",role:"Front-End Developer",desc:"Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ",linkHref:"http://www.mountnittany.org/",mobileImg:"mobile-mnh.png",desktopImg:"laptop-mnh.png",type:"Healthcare",agency:"Andculture"},{id:5,projectName:"Mount Nittany Health Kids",role:"Front-End Developer",desc:"Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.",linkHref:"http://kids.mountnittany.org/",mobileImg:"mobile-mnhkids.png",desktopImg:"laptop-mnhkids.png",type:"Healthcare",agency:"Andculture"},{id:6,projectName:"U-GRO",role:"Front-End Developer",desc:"U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.",linkHref:"https://www.u-gro.com/",mobileImg:"mobile-ugro.png",desktopImg:"laptop-ugro.png",type:"Education",agency:"Andculture"}]},a}()}.call(this);
(function() {
  var app, controllers, directives, services, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  services = webApp.services;

  directives = webApp.directives;

  app = webApp.app = angular.module('webApp', ['angular.filter', 'ngRoute', 'webApp.controllers', 'webApp.services']);

  angular.module('webApp.controllers', []).controller('mainController', controllers.MainController);

  angular.module('webApp.services', []).service('projectService', services.ProjectService).service('anchorScrollService', services.AnchorScrollService).service('expertiseService', services.ExpertiseService);

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
        controllerAs: 'con'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);

(function() {
  var controllers, webApp;

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.LoginController = (function() {
    LoginController.$inject = ['$scope', '$rootScope'];

    function LoginController($scope) {}

    return LoginController;

  })();

}).call(this);

(function() {
  var controllers, webApp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  webApp = me.zach.webApp;

  controllers = webApp.controllers;

  controllers.MainController = (function() {
    MainController.prototype._anchorScrollService = null;

    MainController.prototype._expertiseService = null;

    MainController.prototype.projects = null;

    MainController.prototype.expertise = null;

    MainController.$inject = ['$scope', 'projectService', 'expertiseService', 'anchorScrollService', '$document'];

    function MainController($scope, projectService, expertiseService, anchorScrollService, $document) {
      this.scrollToProject = bind(this.scrollToProject, this);
      this._anchorScrollService = anchorScrollService;
      this.projects = projectService.getProjects();
      this.expertise = expertiseService.getExpertise();
      $scope.isScrolled = false;
      $(document).on('scroll', function() {
        if ($('header').outerHeight() < $(document).scrollTop()) {
          return $scope.$apply(function() {
            return $scope.isScrolled = true;
          });
        } else {
          return $scope.$apply(function() {
            return $scope.isScrolled = false;
          });
        }
      });
    }

    MainController.prototype.scrollToProject = function($event) {
      return this._anchorScrollService.scrollTo($event);
    };

    return MainController;

  })();

}).call(this);

(function() {
  var app, directives;

  directives = me.zach.webApp.directives;

  app = me.zach.webApp.app;

  directives.HeaderDirective = (function() {
    function HeaderDirective() {
      this._initialize();
    }

    HeaderDirective.prototype._initialize = function() {
      return console.log('test');
    };

    return HeaderDirective;

  })();

}).call(this);

(function() {
  var base, base1, base2;

  if (window.me == null) {
    window.me = {};
  }

  if (me.zach == null) {
    me.zach = {};
  }

  if ((base = me.zach).webApp == null) {
    base.webApp = {};
  }

  if ((base1 = me.zach.webApp).controllers == null) {
    base1.controllers = {};
  }

  if ((base2 = me.zach.webApp).services == null) {
    base2.services = {};
  }

}).call(this);

(function() {
  var app, services;

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.anchorScrollService = (function() {
    function anchorScrollService() {}

    anchorScrollService.prototype._initialize = function() {};

    anchorScrollService.scrollTo = function(eID) {
      var i;
      var currentYPosition, distance, elmYPosition, i, leapY, results, speed, startY, step, stopY, timer;
      startY = currentYPosition();
      stopY = elmYPosition(eID);
      distance = stopY > startY ? stopY - startY : startY - stopY;
      currentYPosition = function() {
        if (self.pageYOffset) {
          return self.pageYOffset;
        }
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        }
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        }
        return 0;
      };
      elmYPosition = function(eID) {
        var elm, node, y;
        elm = document.getElementById(eID);
        y = elm.offsetTop;
        node = elm;
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent;
          y += node.offsetTop;
        }
        return y;
      };
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }
      step = Math.round(distance / 25);
      leapY = stopY > startY ? startY + step : startY - step;
      timer = 0;
      if (stopY > startY) {
        i = startY;
        while (i < stopY) {
          setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
          leapY += step;
          if (leapY > stopY) {
            leapY = stopY;
          }
          timer++;
          i += step;
        }
        return;
      }
      i = startY;
      results = [];
      while (i > stopY) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
        }
        timer++;
        results.push(i -= step);
      }
      return results;
    };

    return anchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.AnchorScrollService = (function() {
    function AnchorScrollService() {
      this.scrollTo = bind(this.scrollTo, this);
    }

    AnchorScrollService.prototype._initialize = function() {};

    AnchorScrollService.prototype.scrollTo = function($event) {
      var $target, offset, targetClass;
      $target = $(event.currentTarget);
      targetClass = $target.attr('class');
      offset = $('.block.' + targetClass).position().top;
      $('html, body').animate({
        scrollTop: offset - 100
      }, 600);
      return false;
    };

    return AnchorScrollService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ExpertiseService = (function() {
    function ExpertiseService() {
      this.getExpertise = bind(this.getExpertise, this);
    }

    ExpertiseService.prototype._initialize = function() {};

    ExpertiseService.prototype.getExpertise = function() {
      return [
        {
          type: 'idea',
          name: 'Collaboration'
        }, {
          type: 'idea',
          name: 'Communication'
        }, {
          type: 'ux',
          name: 'Wireframing'
        }, {
          type: 'ux',
          name: 'Content Structure'
        }, {
          type: 'ux',
          name: 'Design'
        }, {
          type: 'development',
          name: 'Database'
        }, {
          type: 'development',
          name: 'Front-End'
        }, {
          type: 'development',
          name: 'Back-End'
        }
      ];
    };

    return ExpertiseService;

  })();

}).call(this);

(function() {
  var app, services,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  services = me.zach.webApp.services;

  app = me.zach.webApp.app;

  services.ProjectService = (function() {
    function ProjectService() {
      this.getProjects = bind(this.getProjects, this);
    }

    ProjectService.prototype._initialize = function() {};

    ProjectService.prototype.getProjects = function() {
      return [
        {
          id: 1,
          projectName: 'Commonwealth Charter Academy',
          role: 'Front-End Developer',
          desc: 'CCA is a K-12 public cyber charter school in Pennsylvania. ',
          linkHref: 'https://ccaeducate.me/',
          mobileImg: 'mobile-cca.png',
          desktopImg: 'laptop-cca.png',
          type: 'Education',
          agency: 'Andculture'
        }, {
          id: 2,
          projectName: 'Eliance Health Solutions',
          role: 'Front-End/Back-End Developer',
          desc: 'Eliance Health Solutions offers employers Lancaster General Health integrated group health products: medical benefits, wellness and occupational medicine. ',
          linkHref: 'http://eliancehealthsolutions.org/',
          mobileImg: 'mobile-ehs.png',
          desktopImg: 'laptop-ehs.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 3,
          projectName: 'Pinnacle Health',
          role: 'Front-End Developer',
          desc: 'Pinnacle Health is a top-rated healthcare system in south-central PA. ',
          linkHref: 'https://www.pinnaclehealth.org/',
          mobileImg: 'mobile-pinnacle.png',
          desktopImg: 'laptop-pinnacle.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 4,
          projectName: 'Mount Nittany Health',
          role: 'Front-End Developer',
          desc: 'Based in State College, Pennsylvania, Mount Nittany Health provides emergency and surgical services at its hospital. ',
          linkHref: 'http://www.mountnittany.org/',
          mobileImg: 'mobile-mnh.png',
          desktopImg: 'laptop-mnh.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 5,
          projectName: 'Mount Nittany Health Kids',
          role: 'Front-End Developer',
          desc: 'Mount Nittany Health Kids is an online source to learn about their team and offices, and to help you teach children about the importance of being healthy and what it’s like to go to the doctor’s office.',
          linkHref: 'http://kids.mountnittany.org/',
          mobileImg: 'mobile-mnhkids.png',
          desktopImg: 'laptop-mnhkids.png',
          type: 'Healthcare',
          agency: 'Andculture'
        }, {
          id: 6,
          projectName: 'U-GRO',
          role: 'Front-End Developer',
          desc: 'U-GRO is the leading childcare provider in Central PA that offers infant, toddler, preschool and before & after school programs at 11 locations.',
          linkHref: 'https://www.u-gro.com/',
          mobileImg: 'mobile-ugro.png',
          desktopImg: 'laptop-ugro.png',
          type: 'Education',
          agency: 'Andculture'
        }
      ];
    };

    return ProjectService;

  })();

}).call(this);
