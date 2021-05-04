import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const GraphHome = () => {
  const [chars, setChars] = useState([]);
  let query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `;
  let { data, loading, error } = useQuery(query);

  useEffect(() => {
    if (data && !loading && !error) {
      setChars([...data.characters.results]);
    }
  }, [data, error, loading]);

  const nextCharacter = () => {
    chars.shift();
    setChars([...chars]);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Card
      leftClick={nextCharacter}
      //   rightClick={addToFavoritesAction}
      {...chars[0]}
    />
  );
};

export default GraphHome;
