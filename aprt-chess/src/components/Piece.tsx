interface props {
  image: string;
}

function Piece({ image }: props) {
  return (
    <>
      <img src={image} alt='piece-img' className="w-24 h-24"></img>
    </>
  );
}

export default Piece;
