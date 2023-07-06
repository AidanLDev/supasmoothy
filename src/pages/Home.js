import supabase from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError(`Fetching smoothie failed! ${error.message}`);
        setSmoothies(null);
        console.error(error);
        return;
      }

      setSmoothies(data);
      setFetchError(null);
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && (
        <div>
          <p>{fetchError}</p>
        </div>
      )}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By</p>
            <button onClick={() => setOrderBy("created_at")}>
              Created Date
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie, i) => (
              <SmoothieCard
                key={`${smoothie.id}__${i}`}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
