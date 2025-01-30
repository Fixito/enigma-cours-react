import { Link } from 'react-router';

export default function Cocktail({ id, name, image, glass, info }) {
  return (
    <article>
      <div>
        <img src={image} alt={name} />
        <div>
          <h2>{name}</h2>
          <h3>{glass}</h3>
          <p>{info}</p>
        </div>
        <Link to={`/cocktails/${id}`}>Details</Link>
      </div>
    </article>
  );
}
