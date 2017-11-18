
/**
 * @ngdoc Controller
 * @author Jose Alberto Hidalgo Bonilla
 * @name navigationCtrl
 * @description
 * # controller de navegacion
 */

 (function(){
    'use strict';
    angular
        .module('saaApp')
        .controller('NavegacionCtrl',['$scope','shareSessionService', 'messageHandlerService',  
        function ($scope, shareSessionService, messageHandlerService) {
            $scope.username = '';

            $scope.plazas = [
                {
                    name: "Nueva Plaza",
                    link: "nueva-plaza"
                },
                {
                    name: "Gestión de Plazas",
                    link: "gestionar-plazas"
                }
            ]; 

            $scope.funcionarios = [
                {
                    name: "Nuevo Funcionario",
                    link: "nuevo-funcionario"
                },
                {
                    name: "Gestión de Funcionarios",
                    link: "gestionar-funcionarios"
                }
            ];

            $scope.dependencias = [
                {
                    name: "Gestión de Dependencias",
                    link: "gestionar-dependencias"
                }
            ];
            
            $scope.administracion = [
                {
                    name: "Gestión de Usuarios",
                    link: "gestionar-usuarios"
                },
                {
                    name: "Asignar funcionario a dependencia",
                    link: "asignar-fun-dep"
                },
                {
                    name: "Asignar plaza a dependencia",
                    link: "asignar-plaza-dependencia"
                }
            ];
                    
            $scope.sesion = [
                {
                    name: "Cambiar Contraseña",
                    link: "cambiar-contrasena"
                },
                {
                    name: "Cerrar Sesión",
                    link: "logout"
                }
            ];

          
            var getUserName = function() {
                if(shareSessionService.isStartSession()) {
                    var session = shareSessionService.getSession();
                    $scope.username = session.usuario;
                }  
            };

            getUserName();
         
        }]);    
})();

