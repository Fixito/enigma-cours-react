import { Link, useParams, Navigate } from 'react-router';

import { useFetch } from '../hooks/useFetch';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export default function SingleCocktail() {
  const { cocktailId } = useParams();
  const { data, isLoading, isError } = useFetch(URL + cocktailId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h1>Something went wrong. Try again later</h1>;
  }

  if (!data.drinks) {
    return <Navigate to='/' />;
  }

  const {
    strDrink: name,
    strDrinkThumb: image,
    strCategory: category,
    strAlcoholic: info,
    strGlass: glass,
    strInstructions: instructions,
  } = data.drinks[0];

  const ingredients = Object.entries(data.drinks[0])
    .map(([key, value]) => (key.startsWith('strIngredient') ? value : null))
    .filter((ingredient) => ingredient);

  return (
    <>
      <Link to='/'>Back Home</Link>

      <h1>{name}</h1>

      <div>
        <img src={image} alt={name} />
        <div>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Info:</strong> {info}
          </p>
          <p>
            <strong>Glass:</strong> {glass}
          </p>
          <p>
            <strong>Instructions:</strong> {instructions}
          </p>
          <p>
            <strong>Ingredients: </strong>
            {ingredients.map((ingredient) => ingredient).join(', ')}
          </p>
        </div>
      </div>
    </>
  );
}
