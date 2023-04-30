import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Shows() {
  const { id } = useParams<{id: string}>();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
      // Make a GET request to the PHP backend function
      fetch('http://localhost/kanm-310/react/php/getComments.php?function=getComments&input=')
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  type Comment = {
      comment_id: number;
      show_id: number;
      time_stamp: string;
      comment_text: string;
    };      

  console.log(comments);

  
  return (
    <div>
      <h1>Shows</h1>
      <p>ID: {id}</p>

      {/* show stuff above this point, comments below */}



    </div>
  );
}

export default Shows;