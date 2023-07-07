import supabase from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";
import Intro from "../components/Intro";
import GHIcon from "../components/GHIcon";

export interface SmoothieObject {
  id: number;
  created_at: string;
  title: string;
  method: string;
  rating: number | undefined;
}

const defaultSmoothiesObject = [
  {
    id: 0,
    created_at: "",
    title: "",
    method: "",
    rating: undefined,
  },
];

const Home = () => {
  const [fetchError, setFetchError] = useState<string>("");
  const [smoothies, setSmoothies] = useState<SmoothieObject[]>(
    defaultSmoothiesObject
  );
  const [orderBy, setOrderBy] = useState<string>("created_at");

  const handleDelete = (id: number): void => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: orderBy === "title" ? true : false });

      if (error) {
        setFetchError(`Fetching smoothie failed! ${error.message}`);
        setSmoothies(defaultSmoothiesObject);
        console.error(error);
        return;
      }

      setSmoothies(data);
      setFetchError("");
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="beach-background">
      <div className="page home">
        {fetchError && (
          <div>
            <p>{fetchError}</p>
          </div>
        )}
        <div className="flex gh-title-container">
          <GHIcon />
          <Intro />
        </div>
        {smoothies && (
          <div className="smoothies">
            <div className="order-by">
              <h3>Order By</h3>
              <button
                className={`${orderBy === "created_at" ? "active" : ""}`}
                onClick={() => setOrderBy("created_at")}
              >
                Created Date
              </button>
              <button
                className={`${orderBy === "title" ? "active" : ""}`}
                onClick={() => setOrderBy("title")}
              >
                Title
              </button>
              <button
                className={`${orderBy === "rating" ? "active" : ""}`}
                onClick={() => setOrderBy("rating")}
              >
                Rating
              </button>
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
    </div>
  );
};

export default Home;
