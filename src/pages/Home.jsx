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
import { TiTick } from 'react-icons/ti';
import { BsPlusSquareFill } from 'react-icons/bs';
import { MdDone } from 'react-icons/md';

export default function Home() {
  const [todo, setTodo] = useState();
  const [idTodo, setIdTodo] = useState();
  const [listTodo, setListTodo] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEaseIn, setIsEaseIn] = useState(false);
  const [message, setMessage] = useState("");
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

  const easeIn = (cn) => {
    setIsEaseIn(true);
    cn()
  }

  const unSuccess = () => {
    setTimeout(() => {
      setMessage("");
      setIsSuccess(false);
    }, 1000);
  }

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
      time: time,
      done: false,
      isEaseIn: false,
    });

    setTodo("")
    setIsSuccess(true)
    setMessage("Task added successfully")
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
      time: time,
      done: false
    });
    setTodo("")
    setIsUpdate(false)
    setIsSuccess(true)
    setMessage("Task updated successfully")
  }

  const deleteTodo = (id) => {
    remove(ref(db, `/${auth.currentUser.uid}/${id}`));
    setIsSuccess(true)
    setMessage("Task removed successfully")
  }

  const doneTodo = (todo) => {
    if(todo.done) {
      update(ref(db, `/${auth.currentUser.uid}/${todo.id}`), {
        done: false,
      });
    }
    else if(!todo.done) {
      update(ref(db, `/${auth.currentUser.uid}/${todo.id}`), {
        done: true,
      });
    }
    setIsEaseIn(false);
    
  }

  const handleLogout = () => {
    signOut(auth).then(
      () => {navigate('/')}
    ).catch((err) => alert(err.message))
  }

  return (
    <div class='min-h-screen w-screen flex items-center justify-center py-14 px-10 md:p-16 bg-gradient-to-tr from-darkGray to-secondary'>
      <div class='w-[100%] h-[90%] flex flex-col items-center'>
        <h1 class='md:text-3xl text-2xl font-semibold text-center text-white mb-2'>Let’s organizing your activities!</h1>
        <div class='flex w-full m-10 ml-14'>
          <Input class='ml-2 w-[75%]' type="text" placeholder={isUpdate ? 'Update Task' : 'Add Task'} field={todo} action={handleChangeTodo} actionEnter={handleKeyDownAddTodo}/>

          <div class='sm:w-[15%] md:flex hidden w-auto items-center mr-8'>
          {isUpdate ? 
            <Button class='mb-2 px-3' action={updateTodo}>Update</Button> :
            <Button class='mb-2 px-3' action={addTodo}>Add</Button>            
          }
          </div>
          <div class='sm:w-[15%] md:hidden w-auto flex mr-8'>
            {isUpdate ? 
              <MdDone class='text-primary mt-2 bg-white rounded-lg flex items-center justify-center text-4xl p-1.5  '/> :
              <BsPlusSquareFill class='mb-2 px-3 text-white text-6xl pb-3 pt-1'/>            
            }
          </div>
        </div>
        <div class='h-[50%] py-2 pr-4 my-2 w-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
          <div class='w-full h-72 pr-2'>
            {listTodo.sort((a, b) => a.done - b.done || new Date(b.time) - new Date(a.time)).map((todo) => (
                <div className={`lg:h-14 h-9 px-3 ml-2 mt-4 mb-6 flex justify-between items-center border-2 border-lightGray-300 rounded-lg 
                ${todo.done? 'bg-semiGray bg-opacity-30' : 
                'bg-whiteBone'}
                ${isEaseIn ? 'ease-in duration-700' : 'ease-out duration-700'}`}>
                  <input class='w-5 h-5 bg-primary border-2 accent-primary rounded-full cursor-pointer' type='checkbox' checked={todo.done} 
                  onClick={() => easeIn(() => doneTodo(todo))}/>
                  <h3 className={`w-[100%] px-4 cursor-pointer lg:text-base text-xs ${todo.done ? 'line-through': ''}`} onClick={() => easeIn(() => doneTodo(todo))}>{todo.todo}</h3>
                  <BsTrash class='md:text-xl text-3xl text-[#1C424E] mx-2 cursor-pointer' onClick={() => easeIn(() => deleteTodo(todo.id))}/>
                  <BsPencilSquare class='md:text-xl text-3xl text-[#BD0000] mx-2 cursor-pointer' onClick={() => updateClickTodo(todo)}/>
                </div>
              ))}
              
          </div>
        </div>
        <div class='m-10 md:w-1/5 w-auto flex items-center'>
          <button class='w-full justify-center h-11 p-4 flex items-center rounded-lg bg-darkGray text-white text-base hover:bg-semiGray' onClick={handleLogout}>Logout</button>  
        </div>
        {/* alert success  */}
        {isSuccess ?  
        <div class='absolute bottom-10 right-10 w-auto bg-white bg-opacity-50 h-10 flex items-center justify-center rounded-2xl p-2'>
          <TiTick class='text-2xl text-primary rounded-full border-2 border-primary m-2 mr-1'/>
          <p class='m-2 ml-1'>{message}</p>
        {unSuccess()}
        </div> 
        : <></>}
      </div>
    </div>
  )
}   
