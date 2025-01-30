import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export default function TableHeader({ isActive, isReverse, onClick, header }) {
  return (
    <th onClick={onClick} className={isActive ? 'active' : null}>
      {header}
      {isReverse ? <FaCaretDown /> : <FaCaretUp />}
    </th>
  );
}
