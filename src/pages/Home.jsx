import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, set, query, get, remove, update } from "firebase/database";
import { uid } from 'uid';
import Button from '../components/Button';
import Input from '../components/Input';
import { BsPencilSquare } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

export default function Home() {
  const [todo, setTodo] = useState();
  const [idTodo, setIdTodo] = useState();
  const [listTodo, setListTodo] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if(!user) {
          navigate("/");
        } 
        else if (user) {
          const todoRef = query(ref(db, `/${auth.currentUser.uid}`));
          get(todoRef).then((snapshot) => {
            setListTodo([]);
            const getTodos = snapshot.val();
            console.log(getTodos)
            if(getTodos !== null) {
              Object.values(getTodos).map(getTodo => (
                setListTodo((oldArray) => [...oldArray, getTodo])
              ));
            }
          }).catch((error) => {
            console.error(error)});
        }
        
      })
  })

  const handleChangeTodo = (e) => {
    setTodo(e.target.value);
  }

  const addTodo = () => {
    console.log(todo)
    const id = uid(3);
    const time = new Date().toLocaleString()
    set(ref(db, `/${auth.currentUser.uid}/${id}`), {
      id: id,
      todo: todo,
      time: time
    });

    setTodo("")
  }

  const updateClickTodo = (todo) => {
    setIsUpdate(true);
    setTodo(todo.todo);
    setIdTodo(todo.id);
  }

  const updateTodo = () => {
    const time = new Date().toLocaleString()
    update(ref(db, `/${auth.currentUser.uid}/${idTodo}`), {
      idTodo: idTodo,
      todo: todo,
      time: time
    });
    setTodo("")
  }

  const deleteTodo = (id) => {
    remove(ref(db, `/${auth.currentUser.uid}/${id}`));
  }

  const handleLogout = () => {
    signOut(auth).then(
      () => {navigate('/')}
    ).catch((err) => alert(err.message))
  }

  return (
    <div>
      <div>Home</div>
      <div>
        <label htmlFor="todo"></label>
        <input type="text" value={todo} onChange={handleChangeTodo}/>
        {listTodo.map((todo) => (
          <div>
            <h3>{todo.todo}</h3>
            <BsTrash onClick={() => deleteTodo(todo.id)}/>
            <BsPencilSquare onClick={() => updateClickTodo(todo)}/>
          </div>
        ))}
      </div>
      {isUpdate ? 
      <button onClick={updateTodo}>Update</button> :
      <button onClick={addTodo}>Add</button>
      }
      
      <br />
      
    <button onClick={handleLogout}>Logout</button>  
    </div>
  )
}   
