import React, { useEffect } from 'react';
import Date from './Date';
import styled from 'styled-components';
import TodoInputField from './Lists/TodoInputField';
import { useState } from 'react';
import ListsItems from './Lists/ListsItems';
//전체 틀 잡기
const TodoContainer = styled.div`
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    width: 70vw;
    height: 70vh;
    display: flex;
    margin: 10vh auto;
    border: 0.05rem solid #CBC0C0;
    border-radius: 25px;
    box-shadow: 5px 4px 4px #CBC0C0;
    padding: 2rem;
`

//list가 표시되는 하단부
const Wrapper = styled.div`
    background-color: antiquewhite;
    display: flex;
    flex-direction: row;
`
const TodoLists = styled.div`
    background-color: beige;
    display: flex;
    flex-direction: column;
    width:50%;
`
const DoneLists = styled.div`
    background-color: beige;
    display: flex;
    flex-direction: column;
    width:50%;
`
const ListsCount = styled.div`
    
`

export default function Todos() {
//로컬스토리지 기존 값 가져오기
const savedLists = localStorage.getItem("lists")? JSON.parse(localStorage.getItem("lists")):[];
const [lists, setLists] = useState(savedLists);
const [value, setValue] = useState("");


const deleteTodo = (id) => {
    let deletedTodo = lists.filter((data) => data.id !== id);
    setLists(deletedTodo);
    localStorage.setItem("lists", JSON.stringify(deletedTodo));
  };

const toggleTodo = (id) => {
    let toggledTodo = lists.map((data) =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    setLists(toggledTodo);
    localStorage.setItem("lists", JSON.stringify(toggledTodo));
  };


  const todoCount = lists.filter((data) => !data.completed).length;
  const doneCount = lists.filter((data) => data.completed).length;
  
  
  return (
    <TodoContainer>
        <Date/>
        <Wrapper>
        <TodoLists>
            <TodoInputField
             lists={lists}
             value={value}
             setLists={setLists}
             setValue={setValue}
            />
            {lists.map((data)=>
            data.completed ? <></>:
            <ListsItems
            key = {data.id}
            todo = {data.title}
            data = {data}
            toggleTodo = {toggleTodo}
            deleteTodo = {deleteTodo}
            />
            )}
             
            <ListsCount>{todoCount} lists are left</ListsCount>
        </TodoLists>
       
        <DoneLists>
            <h4>Done</h4>
            {lists.map((data)=>
            data.completed ? 
            <ListsItems
            key = {data.id}
            todo = {data.title}
            data = {data}
            toggleTodo = {toggleTodo}
            deleteTodo = {deleteTodo}
            /> : <></>
            )}
            
            <ListsCount>{doneCount} lists are done! way to go : )</ListsCount>
        </DoneLists>
        </Wrapper>
    </TodoContainer>
  )
}
