var express       = require('express'),
    app           = express(),
    server        = require('http').createServer(app),
    bodyParser    = require('body-parser'),
    sessionController     = require('./controllers/sessionController.js'),
    userController = require('./controllers/userController.js'),
    dependencyController = require('./controllers/dependencyController.js'),
    funcionarioController = require('./controllers/funcionarioController.js'),
    plazaController = require('./controllers/plazaController.js'),
    funDepController = require('./controllers/funDepController.js');
    plazaDependenciaController = require('./controllers/plazaDependenciaController');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/app'));
//send the main page
app.get('/saa', function(req, res) {
    res.sendfile(__dirname + '/common/views/saa.html');
});

app.post('/login', sessionController.login);

app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.addUser);
app.put('/users/:id', userController.updateUser);
app.put('/users/disable/:id',userController.disableUser);
app.put('/changePassword/:id', userController.changePassword);

app.get('/dependencies', dependencyController.getAllDependencies);
app.get('/dependencies/:id', dependencyController.getDependencyById);
app.post('/dependencies', dependencyController.addDependency);
app.put('/dependencies/:id', dependencyController.updateDependency);
app.put('/dependencies/disable/:id', dependencyController.disableDependency);

app.post('/funcionarios', funcionarioController.addFuncionario);
app.post('/funcionarios/academics', funcionarioController.addAcademics);
app.post('/funcionarios/records', funcionarioController.addRecords);
app.get('/funcionarios', funcionarioController.getAllFuncionarios);
app.get('/funcionarios/:id', funcionarioController.getFuncionario);
app.get('/funcionarios/academics/:id', funcionarioController.getAcademicFuncionarioInfo);
app.get('/funcionarios/records/:id', funcionarioController.getAntecedentesFuncionario);
app.put('/funcionarios/:id', funcionarioController.updateFuncionario);
app.put('/funcionarios/academics/:id', funcionarioController.updateAcademics);
app.put('/funcionarios/records/:id', funcionarioController.updateRecords);
app.put('/funcionarios/disable/:id', funcionarioController.disableFuncionario);

app.post('/plazas', plazaController.addPlaza);
app.post('/plazasInfo', plazaController.addPlazaInfo);
app.get('/plazas', plazaController.getAllPlazas);
app.get('/plazas/:id', plazaController.getPlaza);
app.put('/plazas/:id',plazaController.updatePlaza);
app.put('/plazas/disable/:id',plazaController.disablePlaza);
app.get('/plazaCategorias', plazaController.getCategorias);
app.get('/plazaPuestos', plazaController.getPuestos);

app.post('/funDep', funDepController.assignFunDep);
app.get('/funDep/:id', funDepController.getFuncionariosPerDependency);

app.post('/plazaDependencia',plazaDependenciaController.assignPlazaDependencia);
app.get('/plazaDependencia/:id', plazaDependenciaController.getPlazasPerDependency);

server.listen(8080, function(){
	console.log('Listening at port 8080...');
});