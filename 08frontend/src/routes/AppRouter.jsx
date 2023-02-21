import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom';
import '../assets/css/sidebars.css';


import { Login, App } from '../pages';
import { AuthTemplate } from '../components';
import { AuthProvider } from "../contexts";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardTemplate } from '../components/templates/DashboardTemplate';

import { ListDirectors } from '../pages/directors/ListDirectors';
import { ShowDirector } from '../pages/directors/ShowDirector';
import { CreateDirector } from '../pages/directors/CreateDirector';
import { UpdateDirector } from '../pages/directors/UpdateDirector';

import { ListServicios } from '../pages/servicios/ListServicios';
import { ShowServicio } from '../pages/servicios/ShowServicio';
import { CreateServicio} from '../pages/servicios/CreateServicio';
import { UpdateServicio} from '../pages/servicios/UpdateServicio';

import { ListPacientes } from '../pages/pacientes/ListPacientes';
import { ShowPaciente } from '../pages/pacientes/ShowPaciente';
import { CreatePaciente} from '../pages/pacientes/CreatePaciente';
import { UpdatePaciente} from '../pages/pacientes/UpdatePaciente';

import { ListCitas } from '../pages/citas/ListCitas';
import { ShowCita } from '../pages/citas/ShowCita';
import { CreateCita} from '../pages/citas/CreateCita';
import { UpdateCita} from '../pages/citas/UpdateCita';

import { ListCitas2 } from '../pages/citas2/ListCitas2';
import { ShowProfile } from '../pages/citas2/ShowProfile';
//import { UpdatePassUp} from '../pages/citas2/UpdatePassUp';



/*
import { ListPacientes } from '../pages/pacientes/ListPacientes';
import { ShowPaciente } from '../pages/pacientes/ShowPaciente';
import { CreatePacientes} from '../pages/pacientes/CreatePaciente';
import { UpdatePacientes} from '../pages/pacientes/UpdatePaciente';

import { ListServicios } from '../pages/servicios/ListServicios';
import { ShowServicio } from '../pages/servicios/ShowServicio';
import { CreateServicio} from '../pages/servicios/CreateServicio';
import { UpdateServicio} from '../pages/servicios/UpdateServicio';

import { ListCitasAgenda} from '../pages/citas/ListCitasAgenda';
 
                                    <Route index path='/pacientes' element={<ListPacientes />} />
                                    <Route index path='/pacientes/show/:id' element={<ShowPaciente />} />
                                    <Route index path='/pacientes/create' element={<CreatePaciente />} />
                                    <Route index path='/pacientes/edit/:id' element={<UpdatePaciente />} />

                                    <Route index path='/servicios' element={<ListServicios />} />
                                    <Route index path='/servicios/show/:id' element={<ShowServicio />} />
                                    <Route index path='/servicios/create' element={<CreateServicio />} />
                                    <Route index path='/servicios/edit/:id' element={<UpdateServicio />} />

                                      <Route index path='/citasagenda' element={<ListCitasAgenda />} />

import { Calendar} from '../pages/complementos/Calendar';
                                      <Route index path='/complementos' element={<Calendar />} />

*/

<Route index path='/' element={<App />} />
export const AppRouter = () => {
    return (
        
        <AuthProvider>
            
            <Routes>
                <Route path='login/*' element={
                    <PublicRoute>
                        <Routes>
                            <Route element={<AuthTemplate />}>
                                <Route path='/*' element={<Login />} />
                            </Route>
                        </Routes>
                    </PublicRoute>
                } />

                

                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                                <Route element={<DashboardTemplate />}>
                                    <Route index path='/' element={<App />} />
                                    
                                    <Route index path='/directors' element={<ListDirectors />} />
                                    <Route index path='/directors/show/:id' element={<ShowDirector />} />
                                    <Route index path='/directors/create' element={<CreateDirector />} />
                                    <Route index path='/directors/edit/:id' element={<UpdateDirector />} />

                                 
                                    
                                    <Route index path='/servicios' element={<ListServicios />} />
                                    <Route index path='/servicios/show/:id' element={<ShowServicio />} />
                                    <Route index path='/servicios/create' element={<CreateServicio />} />
                                    <Route index path='/servicios/edit/:id' element={<UpdateServicio />} />

                                    <Route index path='/pacientes' element={<ListPacientes />} />
                                    <Route index path='/pacientes/show/:id' element={<ShowPaciente />} />
                                    <Route index path='/pacientes/create' element={<CreatePaciente />} />
                                    <Route index path='/pacientes/edit/:id' element={<UpdatePaciente />} />

                                    <Route index path='/citas' element={<ListCitas />} />
                                    <Route index path='/citas/show/:id' element={<ShowCita />} />
                                    <Route index path='/citas/create' element={<CreateCita />} />
                                    <Route index path='/citas/edit/:id' element={<UpdateCita />} />

                                    <Route index path='/citas2' element={<ListCitas2 />} />
                                    <Route index path='/citas2/show' element={<ShowProfile />} />

                                  
                                </Route>
                        </Routes>
                    </PrivateRoute>
                } />
                 
            </Routes>
           
        </AuthProvider >
        
    )
}
