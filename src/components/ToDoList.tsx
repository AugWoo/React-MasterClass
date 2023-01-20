import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Categories,
  categoryState,
  IToDo,
  toDoSelector,
  toDoState,
} from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

interface IForm {
  toDo: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const category = event.currentTarget.value;
    setCategory(category as IToDo['category']);
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form>
        <select onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

// interface IFormData {
//   errors: {
//     email: {
//       message: string;
//     };
//   };
//   todo: string;
//   name: string;
//   email: string;
//   id: string;
//   pwd: string;
//   pwd2: string;
//   extraError?: string;
// }

// interface IFormData {
//   [key : string] : string;
// }

// function ToDoList() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setError,
//   } = useForm<IFormData>();
//   const onValid = (data: IFormData) => {
//     if (data.pwd !== data.pwd2) {
//       setError(
//         'pwd2',
//         { message: 'Password are not the same.' },
//         { shouldFocus: true } // 커서를 해당 오류 input에다 가져다줌.
//       );
//     }
//     // setError('extraError', { message: 'Server offline.' });
//   };
//   console.log(errors);
//   return (
//     <div>
//       <form
//         style={{ display: 'flex', flexDirection: 'column' }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register('todo', {
//             required: 'todo is required.',
//             minLength: {
//               value: 2,
//               message: 'to-do should be longer than 2.',
//             },
//           })}
//           placeholder='Write a to do'
//         />
//         <span>{errors?.todo?.message}</span>
//         <input
//           {...register('name', {
//             required: 'name is required.',
//             minLength: {
//               value: 2,
//               message: 'name should be longer than 2.',
//             },
//             validate: {
//               noNico: (value) =>
//                 value.includes('nico') ? "'nico' not allowed" : true,
//               noNick: (value) =>
//                 value.includes('nick') ? "'nick' not allowed" : true,
//             },
//           })}
//           placeholder='Name'
//         />
//         <span>{errors?.name?.message}</span>
//         <input
//           {...register('email', {
//             required: 'Email is required.',
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
//               message: 'Only naver.com emails allowed.',
//             },
//             minLength: {
//               value: 2,
//               message: 'Email should be longer than 2.',
//             },
//           })}
//           placeholder='Email'
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register('id', {
//             required: 'id is required.',
//             minLength: {
//               value: 2,
//               message: 'id should be longer than 2.',
//             },
//           })}
//           placeholder='Id'
//         />
//         <span>{errors?.id?.message}</span>
//         <input
//           {...register('pwd', {
//             required: 'pwd is required.',
//             minLength: {
//               value: 2,
//               message: 'password should be longer than 2.',
//             },
//           })}
//           placeholder='Pwd'
//         />
//         <span>{errors?.pwd?.message}</span>
//         <input
//           {...register('pwd2', {
//             required: 'pwd2 is required.',
//             minLength: {
//               value: 2,
//               message: 'password should be longer than 2.',
//             },
//           })}
//           placeholder='Pwd2'
//         />
//         <span>{errors?.pwd2?.message}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
