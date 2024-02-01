/* eslint-disable react/prop-types */
import "./Square.css";
function Square(props) {
  function clicked() {
    props.handleClick(props.id);
  }
  let presentInWinIndexes = false;
  if (props.winIndex) {
    presentInWinIndexes = props.winIndex.includes(parseInt(props.id));
  }
  // console.log(props.winIndex);
  return (
    <>
      <button
        id={props.id}
        className={presentInWinIndexes ? "btn highlight" : "btn"}
        onClick={clicked}
      >
        {props.value}
      </button>
    </>
  );
}

export default Square;
