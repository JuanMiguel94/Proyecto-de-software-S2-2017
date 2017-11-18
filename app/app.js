(function(){
  'use strict';
  angular
    .module('saaApp', [
      'ui.router',
      'ui-notification',
      'ui.bootstrap',
      'ui.navbar',
      'ngDragDrop',
      //'angular.filter',
      'toggle-switch',
      //'chart.js'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

      //muestra esta vista por defecto
      //redirecciona en caso de nos reconocer la ruta ingresada
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        //vista abstracta sobre la que se carga las demás vistas principales
        .state('base', {
          abstract: true,
          url: '',
          templateUrl: 'common/views/base.html'
        })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'login/views/login.html',
          controller: 'LoginCtrl'
        })
        .state('logout', {
          controller: 'LogoutCtrl'
        })
        .state('saa', {
          url: '/saa',
          parent: 'base',
          templateUrl: 'common/views/saa.html'
        })
        .state('gestionar-usuarios', {
          url: '/gestionar-usuarios',
          parent: 'saa',
          templateUrl: 'usuarios/views/gestionar-usuarios.html',
          controller: 'GestionUsuariosCtrl'
        })
        .state('gestionar-dependencias', {
          url: '/gestionar-dependencias',
          parent: 'saa',
          templateUrl: 'dependencias/views/gestionar-dependencias.html',
          controller: 'GestionDependenciasCtrl'
        })
        .state('cambiar-contrasena', {
          url: '/cambiar-contrasena',
          parent: 'saa',
          templateUrl: 'usuarios/views/cambiar-contrasena.html',
          controller: 'PasswordCtrl'
        })
        .state('nuevo-funcionario', {
          url: '/nuevo-funcionario',
          parent: 'saa',
          templateUrl: 'funcionarios/views/nuevo-funcionario.html',
          controller: 'NuevoFuncionarioCtrl'
        })
        .state('gestionar-funcionarios', {
          url: '/gestionar-funcionarios',
          parent: 'saa',
          templateUrl: 'funcionarios/views/gestion-funcionario.html',
          controller: 'GestionFuncionariosCtrl'
        })
        .state('ver-funcionario', {
          url: '/ver-funcionario',
          parent: 'saa',
          templateUrl: 'funcionarios/views/ver-funcionario.html',
          controller: 'VerFuncionarioCtrl'
        })
        .state('actualizar-funcionario', {
          url: '/actualizar-funcionario',
          parent: 'saa',
          templateUrl: 'funcionarios/views/actualizar-funcionario.html',
          controller: 'ActualizarFuncionarioCtrl'
        })
        .state('nueva-plaza', {
          url: '/nueva-plaza',
          parent: 'saa',
          templateUrl: 'plazas/views/nueva-plaza.html',
          controller: 'NuevaPlazaCtrl'
        })
        .state('gestionar-plazas', {
          url: '/gestionar-plazas',
          parent: 'saa',
          templateUrl: 'plazas/views/gestion-plaza.html',
          controller: 'GestionPlazasCtrl'
        })
        .state('ver-plaza', {
          url: '/ver-plaza',
          parent: 'saa',
          templateUrl: 'plazas/views/ver-plaza.html',
          controller: 'VerPlazaCtrl'
        })
        .state('actualizar-plaza', {
          url: '/actualizar-plaza',
          parent: 'saa',
          templateUrl: 'plazas/views/actualizar-plaza.html',
          controller: 'ActualizarPlazaCtrl'
        })
        .state('asignar-fun-dep', {
          url: '/asignar-funcionario-dependencia',
          parent: 'saa',
          templateUrl: 'funcionario-dependencia/views/fun-dep.html',
          controller: 'FunDepCtrl'
        })
        .state('asignar-plaza-dependencia', {
          url: '/asignar-plaza-dependencia',
          parent: 'saa',
          templateUrl: 'plaza-dependencia/views/plaza-dependencia.html',
          controller: 'PlazaDependenciaCtrl'
        })
    })

  .directive('stringToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(value) {
          return '' + value;
        });
        ngModel.$formatters.push(function(value) {
          return parseFloat(value, 10);
        });
      }
    };
  });
})();

