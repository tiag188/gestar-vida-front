import React from 'react';
import {Switch, Route} from 'react-router-dom'
 
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksForm from './pages/Tasks/Form';
import TasksDetail from './pages/Tasks/Detail';

import Users from './pages/Users';
import UsersForm from './pages/Users/Form';
import UsersDetail from './pages/Users/Detail';
 
const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/usuarios" exact component={Users} />
            <Route path="/usuarios_cadastro" exact component={UsersForm} />
            <Route path="/usuarios_cadastro/:id" exact component={UsersForm} />
            <Route path="/usuarios/:id" exact component={UsersDetail} />

            <Route path="/" exact component={Home} />
            <Route path="/tarefas" exact component={Tasks} />
            <Route path="/tarefas_cadastro" exact component={TasksForm} />
            <Route path="/tarefas_cadastro/:id" exact component={TasksForm} />
            <Route path="/tarefas/:id" exact component={TasksDetail} />
        </Switch>
    );
}
 
export default Routes;