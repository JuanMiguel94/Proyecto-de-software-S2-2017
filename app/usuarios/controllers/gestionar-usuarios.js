(function(){
  'use strict';

  /**
   * @ngdoc Controller
   * @author Luis Javier Ramírez Torres
   * @name GestionUsuariosCtrl
   * @description
   * #  controller para la gestion de usuarios
   */
  angular
    .module('saaApp')
    .controller('GestionUsuariosCtrl', ["$scope", "UsuarioService", "messageHandlerService" , "shareSessionService","$uibModal","confirmationModalService",
     function ($scope, usuarioService, messageHandlerService, shareSessionService,$uibModal,confirmationModalService) {
      
      $scope.dateFormat = "dd-MM-yyyy";
      $scope.usersList = {};
      $scope.inputUser = {};
      $scope.showRegDate = false;
      $scope.showEndDate = false;
      $scope.user = {};

      $scope.openRegDatePickerPopUp = function(){
        $scope.showRegDate = !$scope.showRegDate;
        return $scope.showRegDate;
      };

      $scope.openEndDatePickerPopUp = function(){
        $scope.showEndDate = !$scope.showEndDate;
        return $scope.showEndDate;
      };

      $scope.getUsers = function(){
        usuarioService.getUsers().then(function(result) {
          if (result.success){
            $scope.usersList = result.data;
          }
          else{
            $scope.usersList = {};
            messageHandlerService.notifyWarning(null, result.message);
          }
        }); 
      };

      $scope.editUser = function(userToEdit){
        $scope.inputUser.usuario = userToEdit.usuario;
        $scope.inputUser.nombre = userToEdit.nombre;
        $scope.inputUser.correo = userToEdit.correo;
        $scope.inputUser.cedula = userToEdit.cedula;
        $scope.inputUser.tipo = userToEdit.tipo;
        $scope.inputUser.fechaInicioAutorizacion = userToEdit.fechaInicioAutorizacion;
        $scope.inputUser.fechaFinalAutorizacion = userToEdit.fechaFinalAutorizacion;
        $scope.inputUser.activo = userToEdit.activo.data[0];
      };

      $scope.updateUser = function (userToUpdate) {
        userToUpdate.usuarioActual = $scope.user.usuario;
        usuarioService.editUser(userToUpdate).then(function(result) {
          if (result.success){
            $scope.getUsers();
            messageHandlerService.notifySuccess(null, result.message)
            $scope.inputUser = {};
          }
          else{
            messageHandlerService.notifyError(null, result.message);
          }
        });
      };
      
      $scope.addUser = function (newUser) {
        newUser.usuarioActual = $scope.user.usuario;
        newUser.activo = 1;
        newUser.contrasena = newUser.usuario;
        usuarioService.addUser(newUser).then(function(result) {
          if (result.success == true){
            $scope.getUsers();
            messageHandlerService.notifySuccess(null, result.message)
            $scope.inputUser = {};
          }
          else{
            if (!result.message) {
              messageHandlerService.notifyError(null, "Por favor revise los valores ingresados");
              return;
            };
            messageHandlerService.notifyError(null, result.message);
          }
        });
      };

      $scope.disableUser = function(pId){
        $scope.openConfirmationModal(function(response){
          if (!response.success){
            return;
          }
          var data = {usuario: pId, usuarioActual: $scope.user.usuario};
          //user.usuarioActual = $scope.user.usuario;
          usuarioService.disableUser(data).then(function(result){
            if(result.success == true){
              messageHandlerService.notifySuccess(null, result.message);
              $scope.getUsers();
              $scope.inputUser = {};
            }
            else{
                messageHandlerService.notifyError(null, result.message);
            }
          });
        }); 
      };

      $scope.getUser = function() {
        $scope.user = shareSessionService.getSession();
      };

      var setModalContent = function(mTitle, mMessage){
        confirmationModalService.setModalContent(mTitle, mMessage);
      };

      $scope.openConfirmationModal = function (callback) {
        setModalContent('Deshabilitar usuario', '¿Está seguro(a) de que desea deshabilitar el usuario?');
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'confirmationModalTemplate.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {}
        });

        modalInstance.result.then(
          function (confirmationResponse) {
            callback({
              success: confirmationResponse
            });
        }, function () {
          callback({
              success: false
            });
        });
      };

      $scope.getUser();
      $scope.getUsers();
  }]);
})();