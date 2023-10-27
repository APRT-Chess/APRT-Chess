import BlackStartRow from "./BlackStartRow";
import WhiteStartRow from "./WhiteStartRow";
const Board = () => {
    return (
        <div className="board bg-slate-500 h-screen w-screen flex items-center justify-center">
            <div className="wrapper">

                <WhiteStartRow />
                <BlackStartRow />
                <WhiteStartRow />
                <BlackStartRow />
                <WhiteStartRow />
                <BlackStartRow />
                <WhiteStartRow />
                <BlackStartRow />
            </div>
        </div>
    );
};

export default Board;
