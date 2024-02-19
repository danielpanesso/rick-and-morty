
import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setcurrentPage] = useState(1);
  
  useEffect(() => {    
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);      
  }, [finder]);

    const textInput = useRef();
    const handleSubmit = event => {
      event.preventDefault();
      setFinder(textInput.current.value.trim()); // capturar la información que esta dentro del input
    }
  
  // Paginación
  const quantity = 6; // Cantidad de cards por página
  const second = currentPage * quantity; // número de la página
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPages = location && Math.floor(location.residents.length / quantity) + 1; // Total de páginas que voy a utilizar

  return (
    <div className='app'>
      {
        isLoading ?
          <img className='loading' src="https://i.stack.imgur.com/hzk6C.gif" alt="" />
          :
          <>
            <img 
              className='banner' 
              src="https://i0.wp.com/615film.com//wp-content/uploads/2018/05/rick-and-morty-banner.jpg?ssl=1" 
              alt="Banner rick and morty"
               />
            <form className='app_form' 
              onSubmit={handleSubmit}>
              <input className='app_text'
                type="number" 
                ref={textInput} 
                placeholder='type a number (1 to 126)'/>
              <button className='app_btn'>Search</button>
            </form>
            {
              hasError || finder === '0' ?
              <h2>This location don't exist</h2>
              :
              <>
                <LocationCard 
                  location={location}
                />
                <div className='app_container'>
              {
                residentsPart.map(resident => (
                  <ResidentCard 
                    key={resident}
                    url={resident}
                  />
                ))
              }
              </div>
              <Pagination 
                currentPage={currentPage}
                setCurrentPage={setcurrentPage}
                totalPages={totalPages}
              />
              </>
            }
          </>
      }  
    </div>
  )
}

export default App;
