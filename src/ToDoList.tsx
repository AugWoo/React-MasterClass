import { useState } from 'react';

import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;
//     setToDoError('');
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 2) {
//       return setToDoError('Todo should be longer than 1 word.');
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder='Write a to do' />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, formState, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('todo', { required: true, minLength: 2 })}
          placeholder='Write a to do'
        />
        <input
          {...register('name', { required: true, minLength: 2 })}
          placeholder='Name'
        />
        <input
          {...register('id', { required: true, minLength: 2 })}
          placeholder='Id'
        />
        <input
          {...register('pwd', { required: true, minLength: 2 })}
          placeholder='Pwd'
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
