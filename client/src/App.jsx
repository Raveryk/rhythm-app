import { useReducer, useState } from 'react'
import './App.css'
import Form from './pages/Form/form.jsx'
import Grid from './pages/Grid/grid.jsx'
import Header from './components/Header/Header.jsx'
import { reducer, initialState } from './reducers/reducers.js'
import { AppContext, AppDispatchContext } from './contexts/appContext.js'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState) 

  const [canEditForm, setCanEditForm] = useState(true);
  const [canEditGrid, setCanEditGrid] = useState(false);
  const [gridTitle, setGridTitle] = useState('');

  return (
    <>
    <div className="body">
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <section>
            <Toaster />
            <Header />
            <main className="main">
              <div>
                <Form gridTitle={gridTitle} canEditForm={canEditForm} setCanEditForm={setCanEditForm} setCanEditGrid={setCanEditGrid}/>   
              </div>
              <div className="gridContainer">
                <Grid setGridTitle={setGridTitle} setCanEditGrid={setCanEditGrid} canEditGrid={canEditGrid} setCanEditForm={setCanEditForm}/>  
              </div>
            </main>
            <Footer />
          </section>
          </AppDispatchContext.Provider>
        </AppContext.Provider>
      </div>
    </>
  )
}

export default App
