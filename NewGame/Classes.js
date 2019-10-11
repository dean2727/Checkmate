/*  LAYOUT:
    8x8 board, with black pieces top half and white pieces bottom half
    Tiles alternate color, starting with lighter then darker on top row
    Top and bottom sides are labeled a-h
    Left and right sides are numbered 1-8 from the bottom up

    Rook, knight, bishop, king, queen, bishop, knight, rook
    Pawn, pawn  , pawn  , pawn, pawn , pawn  , pawn  , pawn

    Pawn, pawn  , pawn  , pawn, pawn , pawn  , pawn  , pawn
    Rook, knight, bishop, king, queen, bishop, knight, rook


    RULES:
    Every piece attacks by being placed on another piece

    Pawns:  Any pawn can move 2 ahead on the first move
            1 up if it has moved
            Attacks diagonally upwards one space

    Bishops:No restriction in distance for movement, but only moves diagonally
            Attacks by being placed on another piece

    Knights:Any L shape when moving
            Only piece that can jump over pieces

    Rooks:  No restriction in distance for movement
            Moves vertically or horizontally

    Kings:  Moves any direction 1 space

    Queens: No restriction in distance for movement
            Moves any direction

    Winner is declared if he got the other's king
*/
