import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import logo from "./assets/img/logo.jpg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-backend-andromeda-24--5ytnmfswy69s.code.run/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addToBasket = (meal) => {
    const existingItem = basket.find((item) => item.id === meal.id);

    if (existingItem) {
      const updatedBasket = basket.map((item) =>
        item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setBasket(updatedBasket);
    } else {
      setBasket([...basket, { ...meal, quantity: 1 }]);
    }
  };

  const totalPrice = () => {
    let totalPrice = 0;
    basket.map((item) => {
      return (totalPrice += parseFloat(item.price) * item.quantity);
    });
    return totalPrice.toFixed(2);
  };

  const increaseQuantity = (id) => {
    const updatedBasket = basket.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setBasket(updatedBasket);
  };

  const decreaseQuantity = (id) => {
    const updatedBasket = basket
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity !== 0);
    setBasket(updatedBasket);
  };
  /*   const quantity = (item, id) => {
    let quantity = 

  } */

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <header>
        <div className="container">
          <img src={logo} alt="deliveroo logo" />
        </div>
      </header>
      <section>
        <div className="container hero-container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="miam" />
        </div>
      </section>
      <main>
        <div className="container main-container">
          <section className="col-left">
            {data.categories.map((category) => {
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="articles-container">
                      {category.meals.map((meal) => {
                        return (
                          <article
                            key={meal.id}
                            onClick={() => {
                              addToBasket(meal);
                              /*       const newbasket = [...basket];
                              newbasket.push({ ...meal, quantity: 1 });
                              setBasket(newbasket); */
                            }}
                          >
                            <div>
                              <h3>{meal.title}</h3>
                              <p className="description">{meal.description}</p>
                              <span>{meal.price} €</span>
                              {meal.popular && <span>Populaire</span>}
                            </div>

                            {meal.picture && (
                              <img src={meal.picture} alt={meal.title} />
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right">
            <h2>Basket</h2>
            <div>
              {basket.map((item, id) => {
                return (
                  <div className="basket-square" key={id}>
                    <p>{item.title}</p>
                    {/* <p>{item.quantity}</p> */}
                    <p>{item.price}</p>
                    <div>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <p className="totalPrice">{totalPrice()}</p>
              {/*               <p className="subTotalPrice">{totalPrice()}</p>
               */}{" "}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
