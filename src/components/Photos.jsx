function ListOfPhotos({ photos }) {
  return (
    <ul className="photos">
      {photos.map((photo) => (
        <li key={photo.id} className="photo">
          <p>Author: {photo.author}</p>
          <img src={photo.url} alt={`Photo by ${photo.author}`} />
        </li>
      ))}
    </ul>
  );
}

function NoPhotos() {
  return <p>No movies found</p>;
}

export function Photos({ photos }) {
  const hasPhotos = photos?.length > 0;

  return hasPhotos ? <ListOfPhotos photos={photos} /> : <NoPhotos />;
}
