import supabase from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import SmoothieCard from '../components/SmoothieCard';

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select();

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
  }, []);

  return (
    <div className='page home'>
      {fetchError && (
        <div>
          <p>{fetchError}</p>
        </div>
      )}
      {smoothies && (
        <div className='smoothies'>
          {/* order-by buttons */}
          <div className='smoothie-grid'>
            {smoothies.map((smoothie, i) => (
              <SmoothieCard key={`${smoothie.id}__${i}`} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
