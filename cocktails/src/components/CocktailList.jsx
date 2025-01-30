import Cocktail from './Cocktail.jsx';

export default function CocktailList({ cocktails, isError, isLoading }) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <h1>Something went wrong.Try again later</h1>;
  }

  if (!cocktails) {
    return <h1>No cocktails matched your search</h1>;
  }

  const newCocktails = cocktails.map((cocktail) => {
    const { idDrink, strDrink, strDrinkThumb, strGlass, strAlcoholic } =
      cocktail;

    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      glass: strGlass,
      info: strAlcoholic,
    };
  });

  return (
    <>
      <h1>Cocktails</h1>

      <div>
        {newCocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </>
  );
}
