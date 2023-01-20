import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from './atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setToDos((oldToDo) => {
      const targetIndex = oldToDo.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as IToDo['category'] };
      return [
        ...oldToDo.slice(0, targetIndex),
        newToDo,
        ...oldToDo.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
