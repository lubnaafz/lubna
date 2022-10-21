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
    console.log(todo)
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

  const handleKeyDownAddTodo = (e) => {
    if (e.key === "Enter") {
      addTodo(e);
    }
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
    <div class='min-h-screen w-screen flex items-center justify-center p-16 bg-gradient-to-tr from-darkGray to-secondary'>
      <div class='w-[85%] h-[90%] flex flex-col items-center'>
        <h1 class='text-3xl font-semibold text-center text-white mb-2'>Let’s organizing your activities!</h1>
        <div class='flex w-full m-10'>
          <Input class='w-4/5' type="text" placeholder="Add todo" field={todo} action={handleChangeTodo} actionEnter={handleKeyDownAddTodo}/>
          
          <div class='w-1/5 flex items-center'>
          {isUpdate ? 
            <Button class='mb-2 px-3' action={updateTodo}>Update</Button> :
            <Button class='mb-2 px-3' action={addTodo}>Add</Button>
          }
        </div>
        </div>
        <div class='h-[50%] py-2 pr-4 my-2 w-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
          <div class='w-full h-72 pr-2'>
            {listTodo.map((todo) => (
                <div class='h-14 px-3 bg-whiteBone ml-2 mt-4 mb-6 flex justify-between items-center border-2 border-lightGray-300 rounded-lg'>
                  <input class='w-5 h-5 bg-lightGray border-2 accent-primary rounded-full' type="checkbox" />
                  <h3 class='w-[100%] px-4'>{todo.todo}</h3>
                  <BsTrash class='text-xl text-[#1C424E] mx-2' onClick={() => deleteTodo(todo.id)}/>
                  <BsPencilSquare class='text-xl text-[#BD0000] mx-2' onClick={() => updateClickTodo(todo)}/>
                </div>
              ))}
              
          </div>
        </div>
        <div class='m-10 w-1/5 flex items-center'>
          <button class='w-full justify-center h-11 flex items-center rounded-lg bg-darkGray text-white text-base hover:bg-semiGray' onClick={handleLogout}>Logout</button>  
        </div>
      </div>
    </div>
  )
}   
