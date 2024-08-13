import React from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useFetch from "../../hooks/use-fetch";
import Spinner from "../UI/Spinner";

const AvailableMeals = () => {
  const { data, loading, error } = useFetch(
    "https://restaurant-spice-symphony-default-rtdb.firebaseio.com/meals.json"
  );

  if (loading)
    return (
      <div className={classes.top}>
        <Spinner />
      </div>
    );
  if (error) return <div className={classes.error}>{error.message}</div>;

  const mealsList = data.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default React.memo(AvailableMeals);
