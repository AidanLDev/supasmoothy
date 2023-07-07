import React from 'react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { SmoothieObject } from '../pages/Home';

export interface SmoothieCardProps {
  smoothie: SmoothieObject;
  onDelete: (id: number) => void;
}

export default function SmoothieCard({
  smoothie,
  onDelete,
}: SmoothieCardProps) {
  const { title, method, rating, id } = smoothie;

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting a smoothie: ', error);
    }

    if (data) {
      console.log('Deleted smoothie! ', data);
      onDelete(id);
    }
  };

  return (
    <div className='smoothie-card'>
      <h3>{title}</h3>
      <p>{method}</p>
      <div className='rating'>{rating}</div>
      <div className='buttons'>
        <Link to={`/${id}`}>
          <i className='material-icons'>edit</i>
        </Link>
        <i onClick={handleDelete} className='material-icons'>
          delete
        </i>
      </div>
    </div>
  );
}
