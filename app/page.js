"use client";

import React, { useState } from "react";

const ScrollViewInteractiveExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState(null);
  const [rating, setRating] = useState(0); // Para almacenar la calificación en estrellas
  const [loading, setLoading] = useState(false); // Estado para manejar el progreso
  const [progress, setProgress] = useState(0); // Estado para el ancho de la barra de progreso

  // Lista de películas con sus imágenes, títulos y reseñas
  const movies = [
    {
      title: "Venom",
      image: "https://www.sonypictures.es/statics/DP_4310931_VENOM_2018_2000x3000_LSR_Spanish_Castilian_d8171b6383.jpg",
      review: "Venom es un antihéroe que lucha por controlar sus impulsos y salvar al mundo, mientras enfrenta a un enemigo con poderes similares."
    },
    {
      title: "Forrest Gump",
      image: "https://m.media-amazon.com/images/S/pv-target-images/f9ddd832d1b566f5b8dd29a4dbc76b7531c420c8c8d9fdfe94eca128bda8e2b1.jpg",
      review: "La historia de un hombre con un corazón puro que, sin darse cuenta, influye en algunos de los eventos más importantes de la historia de los Estados Unidos."
    },
    {
      title: "Guerra Mundial Z",
      image: "https://pics.filmaffinity.com/Guerra_Mundial_Z-473564207-large.jpg",
      review: "Un ex-agente de la ONU viaja alrededor del mundo tratando de encontrar la fuente del brote de zombis y salvar a la humanidad."
    },
    {
      title: "Matrix",
      image: "https://pics.filmaffinity.com/Matrix-155050517-large.jpg",
      review: "Un hacker descubre que la realidad que conoce no es más que una simulación creada por máquinas para controlar a los humanos."
    },
    {
      title: "Gladiator",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFGVc-ATKU7c15KkhiTNT03jCX7s5mI4oq2CVwhXfPZK1X-c4Y8-HM1X_B27UvOyvgHreITZ0C_hEeS55BksnIuDC5dRIwCqL02cCmYYHPqyVITqMXxbYGYOAQL8EWohrBQ35MAX1rmr3IiIN7phf6trzqsozt1D6ZNJoqw6uYcziLlrT9jRfd7vKcUeY/s1022/Gladiador-2000.jpg",
      review: "Un general romano es traicionado y se convierte en gladiador, buscando venganza contra el emperador corrupto que destruyó su vida."
    },
    {
      title: "Titanic",
      image: "https://pics.filmaffinity.com/Titanic-321994924-large.jpg",
      review: "Una joven y un joven se enamoran en el transatlántico Titanic, pero su historia de amor se ve truncada por el desastre del naufragio."
    },
  ];

  const handlePress = (movie) => {
    setSelectedItem(movie);
    setComment(""); // Reset comment when selecting a new movie
    setSubmittedComment(null); // Clear previous comment result
    setRating(0); // Reset rating
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Cambia la calificación según la estrella seleccionada
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== "" && rating > 0) {
      setLoading(true); // Start loading when submitting the comment
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2; // Increment the progress by 10% at a time
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setSubmittedComment(comment);
          setLoading(false); // Stop loading after completion
        }
      }, 200); // Increment every 200ms (this can be adjusted)
    } else {
      alert("Por favor, escribe un comentario y selecciona una calificación.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}></h1>
      <div style={styles.selectedItemContainer}>
        {selectedItem ? (
          <>
            <p style={styles.selectedText}>Tu Selección: {selectedItem.title}</p>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              style={styles.selectedImage}
              onClick={() => alert(selectedItem.review)} // Muestra la reseña al hacer clic en la imagen
            />
            <p style={styles.review}>{selectedItem.review}</p> {/* Mostrar la reseña aquí */}
          </>
        ) : (
          <p style={styles.selectedText}>No Seleccionaste una Película</p>
        )}
      </div>

      <div style={styles.scrollContainer}>
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              ...styles.box,
              ...(selectedItem?.title === movie.title ? styles.selectedBox : {}),
            }}
            onClick={() => handlePress(movie)}
          >
            <p style={styles.boxText}>{movie.title}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={styles.commentSection}>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Escribe un comentario sobre la película..."
            style={styles.input}
          />

          {/* Estrellas para la calificación */}
          <div style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  ...styles.star,
                  color: rating >= star ? "#FFD700" : "#ccc", // Color dorado para las estrellas seleccionadas
                }}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>

          <button onClick={handleSubmitComment} style={styles.button}>
            Enviar Comentario
          </button>

          {loading && (
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progress,
                  width: `${progress}%`, // Set the width of the progress based on state
                }}
              />
            </div>
          )}

          {submittedComment && (
            <div style={styles.commentResult}>
              <h3>Comentario sobre {selectedItem.title}:</h3>
              <p>{submittedComment}</p>
              <p>Calificación: {rating} Estrellas</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  selectedItemContainer: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  selectedText: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  selectedImage: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    cursor: "pointer", // Añadir cursor pointer para indicar que es clickeable
  },
  review: {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
    fontStyle: "italic",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    maxHeight: "300px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  box: {
    padding: "20px",
    backgroundColor: "#4CAF50", // Verde para los elementos
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  selectedBox: {
    backgroundColor: "#2196F3", // Azul para el elemento seleccionado
  },
  boxText: {
    margin: 0,
    fontSize: "18px",
  },
  commentSection: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  starsContainer: {
    marginBottom: "10px",
    fontSize: "24px",
    cursor: "pointer",
  },
  star: {
    marginRight: "5px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // Verde para el botón
    borderRadius: "5px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  commentResult: {
    marginTop: "20px",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#e8f5e9", // Fondo verde suave para el comentario
    textAlign: "center",
    color: "#388E3C", // Verde para el texto
  },
  progressBar: {
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    marginTop: "10px",
  },
  progress: {
    height: "100%",
    backgroundColor: "#4CAF50", // Barra verde
    borderRadius: "5px",
    transition: "width 0.2s ease-out", // Animación suave
  },
};

export default ScrollViewInteractiveExample;
