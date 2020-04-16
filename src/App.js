import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Recipe from './components/Recipe';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Aler';


function App() {

const [ query, setQuery]= useState('coconut');
const [recipes, setRecipes]=useState([]);
const [ alert, setAlert]= useState('');
const APP_ID='28e99779';
const API_KEY='d41937ac487d56f1ddec6e8cab3e5493';
const Url= `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;

useEffect(()=>{
  
  getData();
  setAlert('');
  setQuery('')
},[query]);


const getData = async()=>{
  if (query !== ''){const result= await axios.get(Url);
    if(!result.data.more){
      return setAlert('No food with such name');
    }
  setRecipes(result.data.hits);
  setAlert('')
}else{
  setAlert('Please fill the form');
}
  
}

const onSubmit = e =>{
  e.preventDefault();
  getData();
  setQuery('');

  
}
const onChange=(e)=>{
  setQuery(e.target.value);


}
  return (
    
    <div className="App">
      
      <h1>Recipe Searching</h1>
      {!recipes.length ?(<p className='loading'>Loading...</p>):
      <>
      <form className='search-form' onSubmit={onSubmit} >
      {alert !== '' && <Alert alert={alert}/>}
        <input type= 'text' placeholder='Search Food' 
        autoComplete='off' onChange={onChange}
        value={query}/>
        <input type='submit' value='search'/>
      </form>
      <div className='recipes'>
{recipes && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
      </>}
    </div>
  );
}

export default App;

